// @ts-ignore
import SvgSuccess from '@/assets/svgs/success.svg'
// @ts-ignore
import SvgCopy from '@/assets/svgs/copy.svg'
// @ts-ignore
import SvgEye from '@/assets/svgs/eye.svg'
// @ts-ignore
import money from "@/assets/images/money.png"
import Image from 'next/image'
import { copyText, formatDate, toNonExponential } from '../../utils'
import React, {Dispatch, SetStateAction, useState} from "react";
import {CoinGoods, CoinOrder, CoinOrderCreate, PayResponse} from "../../api/samira-service-proxyApi";

const Step4 = (props: {
    setStep?: React.Dispatch<React.SetStateAction<number>>
    setCommitData?: Dispatch<SetStateAction<CoinOrderCreate&PayResponse&{coinOrder:CoinOrder}>>
    commitData: CoinOrderCreate&PayResponse&{coinOrder:CoinOrder}
    good?: CoinGoods|undefined
}) => {
  const {commitData} = props
    const [show,setShow] = useState(true)
  return (
    <div className="pt-[18px] pb-[40px] px-[24px] [&_.label>span]:text-[rgba(58,58,89,0.33)] text-[rgba(51,51,64,0.88)]">
      <div className="bg-[linear-gradient(180deg,#44DE94_0%,#1EA68A_100%)] w-[100px] h-[100px] rounded-[50%] flex justify-center items-center mx-auto">
        <SvgSuccess />
      </div>
      <div className="mt-[40px] label label-3-semi-bold flex justify-between items-center h-[24px]">
        <span>Barang</span>
        <p className="flex items-center label-3-regular">
          #{commitData.coinOrder.orderNo}
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
        <p className="label-3-regular">{formatDate((commitData.coinOrder.completeTime||0)*1000, 'DD/MM/YYYY HH:mm:ss')}</p>
      </div>
    </div>
  )
}

export default Step4
