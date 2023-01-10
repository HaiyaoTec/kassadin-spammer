// @ts-ignore
import SvgLoading from '@/assets/svgs/loading.svg'
import { useEffect } from 'react'
import { Toast } from 'react-vant'

const Step3 = (props: {
  setStep: React.Dispatch<React.SetStateAction<number>>
}) => {
  useEffect(() => {
    let num = 3
    Toast.info({ message: `模拟轮询中，还剩${num}s完成` })
    const timer = setInterval(() => {
      if (--num <= 0) {
        clearInterval(timer)
        props.setStep(v => v >= 3 ? 0 : v + 1)
      } else {
        Toast.info({ message: `模拟轮询中，还剩${num}s完成` })
      }
    }, 1000)
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
