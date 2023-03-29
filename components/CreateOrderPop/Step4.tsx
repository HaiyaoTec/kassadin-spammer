// @ts-ignore
import SvgSuccess from '@/assets/svgs/success.svg'
// @ts-ignore
import SvgFailed from '@/assets/svgs/failed.svg'
// @ts-ignore
import SvgCopy from '@/assets/svgs/copy.svg'
// @ts-ignore
import SvgEye from '@/assets/svgs/eye.svg'
// @ts-ignore
import SvgLoading from '@/assets/svgs/loading.svg'
// @ts-ignore
import money from "@/assets/images/money.png"
import {Button} from "react-vant";
import Image from 'next/image'
import { copyText, formatDate, toNonExponential } from '../../utils'
import React, {Dispatch, SetStateAction, useCallback, useEffect, useRef, useState} from "react";
import {CoinGoods, CoinOrder, CoinOrderCreate, PayResponse} from "../../api/samira-service-proxyApi";
import mainApi, { MyToast } from '../../api'

const Step4 = (props: {
    setStep?: React.Dispatch<React.SetStateAction<number>>
    setCommitData: Dispatch<SetStateAction<CoinOrderCreate&PayResponse&{coinOrder:CoinOrder}>>
    commitData: CoinOrderCreate&PayResponse&{coinOrder:CoinOrder}
    good?: CoinGoods|undefined
}) => {
  const {commitData, setCommitData} = props
  const timerRef = useRef<number | NodeJS.Timeout>()
  const [state, setState] = useState(commitData.coinOrder.state ?? 0)
  const [btnLoading, setBtnLoading] = useState(false)
  const rechargNORef = useRef(commitData.rechargNO)
  useEffect(() => {
    rechargNORef.current = commitData.rechargNO
  }, [commitData.rechargNO])
  const getResData = () => {
    return mainApi.ServicePayApi.getOrder(rechargNORef.current!).then(res=>{
      setState(res.state ?? 0)
      setCommitData(v=>({...v,coinOrder:res}))
      if(res.state===5||res.state===7){
        // props.setStep(v => v + 1)
        clearInterval(timerRef.current)
        location.reload()
        commitData.portKey && MyToast.success({message:"Top up sukses"})
      } else if (res.state===3||res.state===9) {
        // props.setStep(v => v + 1)
        clearInterval(timerRef.current)
        commitData.portKey && MyToast.success({message:"Top up gagal"})
      }
    })
  }
  useEffect(() => {
    commitData.rechargNO && commitData.portKey && getResData()
  }, [commitData.rechargNO, commitData.portKey])
  const refesh = () => {
    setBtnLoading(true)
    getResData().finally(() => {
      setBtnLoading(false)
    })
  }
  useEffect(() => {
    if (state === 0) {
      let num = 60
      timerRef.current = setInterval(() => {
        if (--num <= 0) {
          clearInterval(timerRef.current)
        } else {
          getResData()
        }
      }, 3000)
    }
    return () => {
      clearInterval(timerRef.current)
    }
  }, [state])
    const [show,setShow] = useState(false)
  return (
    <div className="pt-[18px] pb-[40px] px-[24px] [&_.label>span]:text-[rgba(58,58,89,0.33)] text-[rgba(51,51,64,0.88)]">
      <div className={"w-[100px] h-[100px] rounded-[50%] flex justify-center items-center mx-auto" + (state === 0 ? '' : ' bg-[linear-gradient(180deg,#44DE94_0%,#1EA68A_100%)]')}>
        {
          [5,7].includes(state)
            ? <SvgSuccess />
              : state === 0
                ? <SvgLoading className="my-[40px] mx-auto animate-rotateInfinity" width={100} height={100} />
                : <SvgFailed />
        }
      </div>
      <div className="mt-[40px] label label-3-semi-bold flex justify-between items-center h-[24px]">
        <span>Order ID</span>
        <p className="flex items-center label-3-regular">
          {commitData.coinOrder.orderNo}
          <span onClick={() => copyText(String(commitData.coinOrder.orderNo))} className="inline-flex justify-center items-center w-[24px] h-[24px] bg-[rgba(30,166,138,0.1)] rounded-[3px] ml-[4px] cursor-pointer"><SvgCopy /></span>
        </p>
      </div>
      <div className="mt-[12px] label label-3-semi-bold flex justify-between items-center h-[24px]">
        <span>Barang</span>
        <p className="label-3-bold flex items-center">
          <Image alt="" src={money} width={18} height={18} />
          <span className="ml-[4px] text-[#1EA68A]">{toNonExponential(commitData.coinOrder.income||0)}</span>
        </p>
      </div>
      <div className="mt-[12px] label label-3-semi-bold flex justify-between items-center h-[24px]">
        <span>Harga</span>
        <p className="label-3-bold flex items-center text-[#1EA68A]">
            Rp {show?toNonExponential(commitData.coinOrder.price||0):'*****'}
          <span onClick={() => setShow(v=>(!v))} className="inline-flex justify-center items-center w-[24px] h-[24px] bg-[rgba(30,166,138,0.1)] rounded-[3px] ml-[4px] cursor-pointer"><SvgEye /></span>
        </p>
      </div>
      <div className="mt-[12px] label label-3-semi-bold flex justify-between items-center h-[24px]">
        <span>Menerima ID</span>
        <p className="label-3-regular">{commitData.coinOrder.receiverUid}</p>
      </div>
      <div className="mt-[12px] label label-3-semi-bold flex justify-between items-center h-[24px]">
        <span>Jam Kedatangan</span>
        <p className="label-3-regular">{commitData.coinOrder.completeTime ? formatDate((commitData.coinOrder.completeTime||0)*1000, 'DD/MM/YYYY HH:mm:ss') : '——'}</p>
      </div>
      {state === 0 && <div className="mt-[40px]">
        <p className="text-regular text-[rgba(71,71,101,0.55)]">Jika Anda sudah membayar, harap bersabar menunggu sekitar 2 menit untuk tiba, Anda juga dapat</p>
        <Button loading={btnLoading} onClick={refesh} className={'!mt-[8px] w-full !rounded-[3px] !border-0 label-1-bold !bg-[#1EA68A]'}
                nativeType='submit' type='primary'>
            Menyegarkan
        </Button>
      </div>}
    </div>
  )
}

export default Step4
