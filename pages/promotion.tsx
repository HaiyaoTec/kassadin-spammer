import {Button, Empty} from 'react-vant';
import {NextPageWithLayout} from "./_app";
import React, {ReactElement, useEffect, useState} from "react";
import Layout from "../components/Layout";
// @ts-ignore
import promotion_banner from "@/assets/images/promotion_banner.png"
// @ts-ignore
import SvgTel from "@/assets/svgs/tel.svg"
import Image from 'next/image'
import mainApi from "../api";
import {PhoneNumber} from "../api/samira-service-user-httpApi";

const Promotion: NextPageWithLayout = () => {
  const [potentialUser,setPotentialUser]= useState<PhoneNumber[]>([])
  useEffect(()=>{
      mainApi.ServiceUserApi.loadingPhoneNumberList().then(res=>{
          setPotentialUser(res)
      })
  },[])
  const toContact = (phone:string)=>{
    window.open(`https://wa.me/${phone}`,'_blank')
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
