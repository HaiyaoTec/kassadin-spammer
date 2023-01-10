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

const Step4 = () => {
  const data = {
    orderId: 2205061522375698,
    barang: 920102000,
    harga: 82000,
    menerimaId: 12301000229,
    time: Date.now(),
  }
  return (
    <div className="pt-[18px] pb-[40px] px-[24px] [&_.label>span]:text-[rgba(58,58,89,0.33)] text-[rgba(51,51,64,0.88)]"> 
      <div className="bg-[linear-gradient(180deg,#44DE94_0%,#1EA68A_100%)] w-[100px] h-[100px] rounded-[50%] flex justify-center items-center mx-auto">
        <SvgSuccess />
      </div>
      <div className="mt-[40px] label label-2-semi-bold flex justify-between items-center h-[24px]">
        <span>Barang</span>
        <p className="flex items-center label-2-regular">
          #{data.orderId}
          <span onClick={() => copyText(String(data.orderId))} className="inline-flex justify-center items-center w-[24px] h-[24px] bg-[rgba(30,166,138,0.1)] rounded-[3px] ml-[4px] cursor-pointer"><SvgCopy /></span>
        </p>
      </div>
      <div className="mt-[12px] label label-2-semi-bold flex justify-between items-center h-[24px]">
        <span>Barang</span>
        <p className="label-3-bold flex items-center">
          <Image alt="" src={money} width={18} height={18} />
          <span className="ml-[4px] text-[#1EA68A]">{toNonExponential(data.barang)}</span>
        </p>
      </div>
      <div className="mt-[12px] label label-2-semi-bold flex justify-between items-center h-[24px]">
        <span>Harga</span>
        <p className="label-3-bold flex items-center text-[#1EA68A]">
          Rp {toNonExponential(data.harga)}
          <span onClick={() => alert('eye click')} className="inline-flex justify-center items-center w-[24px] h-[24px] bg-[rgba(30,166,138,0.1)] rounded-[3px] ml-[4px] cursor-pointer"><SvgEye /></span>
        </p>
      </div>
      <div className="mt-[12px] label label-2-semi-bold flex justify-between items-center h-[24px]">
        <span>Menerima ID</span>
        <p className="label-2-regular">{data.menerimaId}</p>
      </div>
      <div className="mt-[12px] label label-2-semi-bold flex justify-between items-center h-[24px]">
        <span>Jam Kedatangan</span>
        <p className="label-2-regular">{formatDate(data.time, 'DD-MM-YYYY HH:mm:ss')}</p>
      </div>
    </div>
  )
}

export default Step4
