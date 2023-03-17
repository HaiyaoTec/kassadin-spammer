import {Success} from "@react-vant/icons"
import React, {Dispatch, SetStateAction, useEffect, useState} from "react"
import BlurImg from "../BlurImg"
import mainApi from "../../api";
import {Button} from "react-vant";
import {CoinGoods, CoinOrder, CoinOrderCreate, PayResponse} from "../../api/samira-service-proxyApi";
import {PayBank} from "../../api/heracles-payApi";

const Step2 = (props: {
    setStep: React.Dispatch<React.SetStateAction<number>>
    setCommitData: Dispatch<SetStateAction<CoinOrderCreate&PayResponse&{coinOrder:CoinOrder}>>
    commitData: CoinOrderCreate&PayResponse&{coinOrder:CoinOrder}
    good: CoinGoods|undefined
}) => {
    const {setCommitData, commitData,good} = props
    const [bankList,setBankList] = useState<PayBank[]>([])
    const [activeBank, setActiveBank] = useState<PayBank>()
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        mainApi.HeraclesPayApi.getBanks({currency:'IDR'}).then(res=>{
            setBankList(res)
            setActiveBank(res[0])
        })
    }, [])
    const commit = ()=>{
        setCommitData(val => ({...val, portKey: activeBank?.portKey!}))
        setLoading(true)
        const newWindow = window.open('about:blank') as Window
        mainApi.ServicePayApi.buyCoin({
            receiverUid:commitData.receiverUid,
            portKey:activeBank?.portKey!,
            id:good?.id!
        }).then(res=>{
            props.setStep(v => v + 1)
            setCommitData(val => ({...val, ...res}))
            newWindow.location.href = res.payUrl as string
        }).finally(()=>{
            setLoading(false)
        })
    }
    return (
        <>
            <div className="flex justify-center flex-col items-center pt-[8px] pb-[20px] bg-[#F9F9FC]">
                <div className={'w-full overflow-auto max-h-[70vh]'}>
                    {bankList.map((item, key) => (
                        <div onClick={() => item.state!=='1' || setActiveBank(item)} key={key}
                             className={`rounded-[3px] px-[16px] py-[10px] flex items-center [border:1px_solid_transparent] justify-between transition-all duration-100 ${activeBank?.portKey === item.portKey ? 'h-[50px] ![border:1px_solid_#1EA68A] bg-[rgba(30,166,138,0.1)]' : 'h-[50px]'} ${item.state!=='1' ? 'bg-[#EDEDF1]' : ''}`}>
                            <div className="flex items-center">
                                <div
                                    className="relative mr-[6px] w-[81px] h-[30px] [border:1px_solid_rgba(53,63,78,0.07)] rounded-[5px] overflow-hidden">
                                    {item.icon && <BlurImg src={item.icon}/>}
                                </div>
                                <div className="text-[rgba(51,51,64,0.88)]">
                                    {/*<p className="label-3-semi-bold mb-[4px]">{item.bankNumber}</p>*/}
                                    <p className="label-4-regular">{item.title}</p>
                                </div>
                            </div>
                            {item.state!=='1' || <div
                                className={`w-[18px] h-[18px] rounded-[50%] flex justify-center items-center ${activeBank?.portKey === item.portKey ? 'bg-[#1EA68A]' : 'bg-[rgba(61,61,89,0.18)]'}`}>
                                {activeBank?.portKey === item.portKey && <Success width={10} color="#ffffff"/>}
                            </div>}
                        </div>
                    ))}
                </div>
                <Button loading={loading} onClick={commit} className={'!mt-2 w-[70%] !rounded-[18px] !border-0 label-1-bold !bg-[#1EA68A]'}
                        nativeType='submit' type='primary'>
                    yakin
                </Button>
            </div>
        </>
    )
}

export default Step2
