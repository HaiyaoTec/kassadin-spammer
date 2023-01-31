import {Button, Empty} from 'react-vant';
import {NextPageWithLayout} from "./_app";
import React, {ReactElement, useEffect, useState} from "react";
import Layout from "../components/Layout";
// @ts-ignore
import promotion_banner from "@/assets/images/promotion_banner.png"
// @ts-ignore
import SvgTel from "@/assets/svgs/tel.svg"
import Image from 'next/image'
import mainApi, { MyToast } from "../api";
import {PhoneNumber} from "../api/samira-service-user-httpApi";

const Promotion: NextPageWithLayout = () => {
  const [potentialUser,setPotentialUser]= useState<PhoneNumber[]>([])
  const [potentialUserAll,setPotentialUserAll]= useState<PhoneNumber[]>([])
  const [getMoreLoading,setGetMoreLoading]= useState<boolean>(false)
  useEffect(()=>{
      mainApi.ServiceUserApi.loadingPhoneNumberList().then(res=>{
          setPotentialUser(res.slice(0, 10))
          setPotentialUserAll(res)
      })
  },[])
  const toContact = (phone:string)=>{
    window.open(`https://wa.me/${phone}`,'_blank')
  }
  const getMore = () => {
    if (getMoreLoading) {
      return
    }
    if (potentialUserAll.length <= 10) {
      MyToast.warning({message:"Setelah membeli koin emas, Anda dapat memuat lebih banyak pengguna"})
      return
    }
    setGetMoreLoading(true)
    setTimeout(() => {
      setPotentialUser(potentialUserAll)
      setGetMoreLoading(false)
    }, 200);
  }
  return (
    <div>
      <div className="relative h-[150px]">
        <Image layout="fill" objectFit="cover" alt="banner" src={promotion_banner} />
      </div>
      <div className="bg-[#4580F0]">
        <div className="pt-[30px] bg-[#ffffff] rounded-t-[24px]">
          <ul className="p-[0px_30px_14px] h-[calc(var(--pop-height)_-_290px)] overflow-y-auto">
            {
              potentialUser?.length>0?potentialUser.map((item, idx) => (
                <li key={idx} className="[border:1px_solid_rgba(53,63,78,0.07)] h-[42px] bg-[#F9F9FC] flex items-center rounded-[3px] mb-[16px]">
                  <p className="flex-1 pl-[16px] label-3-regular text-[rgba(51,51,64,0.88)]">+62 {item.phone?.slice(0, 4)}****{item.phone?.slice(-2)}</p>
                  <Button onClick={()=>toContact(item.phone)} className="!bg-[#1EA68A] !text-[#ffffff] !h-[42px] !py-0 !border-none !px-[10px] !rounded-[3px] translate-x-[1px] label-2-semi-bold" icon={<SvgTel />} >
                    Kointak
                  </Button>
                </li>
              )):<Empty className={'whitespace-nowrap'} description="Sudah tak terhitung jumlahnya" />
            }
            <div className="w-[70px] h-[18px] [border:1px_solid_#22BB9C] rounded-[20px] relative mx-auto">
            <div style={{
                width: `${potentialUser.length / 200 * 100}%`
              }} className="rounded-[20px] h-full bg-[rgba(30,166,138,0.1)] absolute left-0 top-0"></div>
              <p className="relative label-4-regular leading-[18px] text-center text-[rgba(71,71,101,0.55)]">{potentialUser.length}/{200}</p>
            </div>
            <div className="text-center mt-[10px] text-[12px] text-[rgba(58,58,89,0.33)]">
              {
                potentialUser.length >= 200
                  ? <span>Tidak ada lagi</span>
                  : getMoreLoading
                    ? <span>memuat...</span>
                    : <Button onClick={getMore} className="!bg-[#EDEDF1] !rounded-[4px] !h-[28px] translate-x-[1px] label-4-regular !px-[30px] !text-[12px] !text-[rgba(58,58,89,0.33)] !border-none">Lebih</Button>
              }
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}
Promotion.getLayout = function (page: ReactElement) {
  return (
      <Layout>
        {page}
      </Layout>
  )
}
export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default Promotion
