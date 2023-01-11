import { Success } from "@react-vant/icons"
import { useState } from "react"
import BlurImg from "../BlurImg"

const Step1 = (props: {
  setStep: React.Dispatch<React.SetStateAction<number>>
}) => {
  const bankList = [
    {
      id: 1,
      img: 'https://img2.baidu.com/it/u=3564422843,1071800624&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=493',
      bankNumber: '7831*****2131',
      bankRemark: 'No****ah',
      disabled: false,
    },
    {
      id: 2,
      img: 'https://img2.baidu.com/it/u=3564422843,1071800624&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=493',
      bankNumber: '7831*****2131',
      bankRemark: 'No****ah',
      disabled: false,
    },
    {
      id: 3,
      img: 'https://img2.baidu.com/it/u=3564422843,1071800624&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=493',
      bankNumber: '7831*****2131',
      bankRemark: 'No****ah',
      disabled: false,
    },
    {
      id: 4,
      img: 'https://img2.baidu.com/it/u=3564422843,1071800624&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=493',
      bankNumber: '7831*****2131',
      bankRemark: 'No****ah',
      disabled: false,
    },
    {
      id: 5,
      img: 'https://img2.baidu.com/it/u=3564422843,1071800624&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=493',
      bankNumber: '7831*****2131',
      bankRemark: 'No****ah',
      disabled: true,
    },
    {
      id: 6,
      img: 'https://img2.baidu.com/it/u=3564422843,1071800624&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=493',
      bankNumber: '7831*****2131',
      bankRemark: 'No****ah',
      disabled: true,
    },
  ]
  const [activeBank, setActiveBank] = useState(bankList[0])
  return (
    <div className="pt-[8px] pb-[20px] bg-[#F9F9FC]"> 
      {bankList.map((item, key) => (
        <div onClick={() => item.disabled || setActiveBank(item)} key={key} className={`rounded-[3px] px-[16px] py-[10px] flex items-center justify-between mb-[1px] transition-all duration-100 ${activeBank.id === item.id ? 'h-[60px] [border:1px_solid_#1EA68A] bg-[rgba(30,166,138,0.1)]' : 'h-[50px]'} ${item.disabled ? 'bg-[#EDEDF1]' : ''}`}>
          <div className="flex items-center">
            <div className="relative mr-[6px] w-[81px] h-[30px] [border:1px_solid_rgba(53,63,78,0.07)] rounded-[5px] overflow-hidden">
              <BlurImg src={item.img} />
            </div>
            <div className="text-[rgba(51,51,64,0.88)]">
              <p className="label-3-semi-bold mb-[4px]">{item.bankNumber}</p>
              <p className="label-4-regular">{item.bankRemark}</p>
            </div>
          </div>
          {item.disabled || <div className={`w-[18px] h-[18px] rounded-[50%] flex justify-center items-center ${activeBank.id === item.id ? 'bg-[#1EA68A]' : 'bg-[rgba(61,61,89,0.18)]'}`}>
            {activeBank.id === item.id && <Success width={10} color="#ffffff" />}
          </div>}
        </div>
      ))}
      <button className="block mx-auto [border:1px_solid_#333]" onClick={() => props.setStep(v => v >= 3 ? 0 : v + 1)}>下一步</button>
    </div>
  )
}

export default Step1
