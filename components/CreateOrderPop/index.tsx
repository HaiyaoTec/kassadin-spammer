import React, { useEffect, useMemo, useState } from 'react'
import { Popup } from 'react-vant'
import Step2 from './Step2'
import Step1 from './Step1'
import Step3 from './Step3'
import Step4 from './Step4'
import {CoinGoods, CoinOrder, CoinOrderCreate, PayResponse} from "../../api/samira-service-proxyApi";

const steps = [
  Step1,
  Step2,
  Step3,
  Step4,
]

const CreateOrderPop = (props: {
  good: CoinGoods|undefined
  close: () => void
}) => {
  const [step, setStep] = useState(0)
  const Content = useMemo(() => steps[step], [step])
  const [commitData,setCommitData] = useState<CoinOrderCreate&PayResponse&{coinOrder:CoinOrder}>({
    extra: "", income: 0, portKey: "", receiverUid: "", payUrl: "", rechargNO: "", coinOrder: {
      completeTime: 0, createTime: 0, income: 0, orderNo: "", price: 0, receiverUid: "", state: 0
    }
  })
  useEffect(() => {
    !!props.good && setStep(0)
  }, [props.good])
  return (
    <Popup className="rounded-t-[40px]" position="bottom" visible={!!props.good} onClose={props.close}>
      <div onClick={props.close} className="py-[9px]">
        <div className="bg-[rgba(61,61,89,0.18)] w-[120px] h-[4px] rounded-[2px] mx-auto"></div>
      </div>
      <Content setCommitData={setCommitData} commitData={commitData} setStep={setStep} good={props.good}/>
    </Popup>
  )
}

export default CreateOrderPop
