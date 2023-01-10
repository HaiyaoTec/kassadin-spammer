import React, { useEffect, useMemo, useState } from 'react'
import { Popup } from 'react-vant'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'

const steps = [
  Step1,
  Step2,
  Step3,
  Step4,
]

const CreateOrderPop = (props: {
  open: boolean
  close: () => void
}) => {
  const [step, setStep] = useState(0)
  const Content = useMemo(() => steps[step], [step])
  useEffect(() => {
    props.open && setStep(0)
  }, [props.open])
  return (
    <Popup className="rounded-t-[40px]" position="bottom" visible={props.open} onClose={props.close}>
      <div onClick={props.close} className="py-[9px]">
        <div className="bg-[rgba(61,61,89,0.18)] w-[120px] h-[4px] rounded-[2px] mx-auto"></div>
      </div>
      <Content setStep={setStep} />
    </Popup>
  )
}

export default CreateOrderPop
