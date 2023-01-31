// @ts-ignore
import SvgLoading from '@/assets/svgs/loading.svg'
import React, {Dispatch, SetStateAction, useEffect} from 'react'
import { Toast } from 'react-vant'
import {CoinGoods, CoinOrder, CoinOrderCreate, PayResponse} from "../../api/samira-service-proxyApi";
import mainApi, {MyToast} from "../../api";

const Step3 = (props: {
  setStep: React.Dispatch<React.SetStateAction<number>>
  setCommitData: Dispatch<SetStateAction<CoinOrderCreate&PayResponse&{coinOrder:CoinOrder}>>
  commitData: CoinOrderCreate&PayResponse&{coinOrder:CoinOrder}
  good: CoinGoods|undefined
}) => {
  useEffect(() => {
    const {commitData,setCommitData} = props
    let num = 60
    const timer = setInterval(() => {
      if (--num <= 0) {
        clearInterval(timer)
      } else {
        mainApi.ServicePayApi.getOrder(commitData.rechargNO!).then(res=>{
          if(res.state===5||res.state===7){
            props.setStep(v => v + 1)
            setCommitData(v=>({...v,coinOrder:res}))
            clearInterval(timer)
            MyToast.success({message:"Top up sukses"})
          } else if (res.state===3||res.state===9) {
            props.setStep(v => v + 1)
            setCommitData(v=>({...v,coinOrder:res}))
            clearInterval(timer)
            MyToast.success({message:"Top up gagal"})
          }
        })
      }
    }, 3000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <div className="pt-[18px] pb-[40px] px-[24px]">
      <h3 className="text-[#1EA68A] h2-semi-bold text-center">Membayar</h3>
      <SvgLoading className="my-[40px] mx-auto animate-rotateInfinity" width={100} height={100} />
      <p className="text-regular text-[rgba(51,51,64,0.88)] text-center">Silahkan ke pembayaran, jika sudah menyelesaikanpembayaran, harap tunggu sebentar, pembayaran akanmasuk ke rekening dalam waktu 2 menit.</p>
    </div>
  )
}

export default Step3
