import { useState } from "react"
import { Button, Input } from "react-vant"
// @ts-ignore
import money from "@/assets/images/money.png"
import Image from 'next/image'
import { toNonExponential } from "../../utils"

const Step2 = (props: {
  setStep: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [code, setCode] = useState('')
  const data = {
    barang: 920102000,
    harga: 82000,
  }
  return (
    <div className="pt-[18px] pb-[40px] px-[24px] [&_.label]:text-[rgba(58,58,89,0.33)]"> 
      <h3 className="text-[#1EA68A] h2-semi-bold text-center">Konfrmasi Pemesanan</h3>
      <p className="mt-[49px] label label-4-semi-bold">Menerima ID</p>
      <Input
        className="!text-[14px] [border:1px_solid_rgba(53,63,78,0.07)] bg-[#F9F9FC] h-[50px] px-[16px] rounded-[3px] mt-[9px] mb-[20px] [&>input]:!text-[rgba(51,51,64,0.88)] [&>input::placeholder]:text-[rgba(61,61,89,0.18)]"
        value={code}
        onChange={code => setCode(code)}
        placeholder='Verification Code'
      />
      <div className="label label-3-semi-bold flex justify-between items-center h-[24px]">
        <span>Barang</span>
        <p className="label-3-bold flex items-center">
          <Image alt="" src={money} width={18} height={18} />
          <span className="ml-[4px] text-[#1EA68A]">{toNonExponential(data.barang)}</span>
        </p>
      </div>
      <div className="mt-[20px] label label-3-semi-bold flex justify-between items-center h-[24px] mb-[40px]">
        <span>Harga</span>
        <p className="label-3-bold flex items-center text-[#1EA68A]">
          Rp {toNonExponential(data.harga)}
        </p>
      </div>
      <Button onClick={() => props.setStep(v => v >= 3 ? 0 : v + 1)} className="!bg-[#1EA68A] !border-none rounded-[3px] label-2-bold !text-[16px] !text-[#ffffff] w-full">To Pay</Button>
    </div>
  )
}

export default Step2
