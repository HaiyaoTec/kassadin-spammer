import { Button } from 'react-vant';
import {NextPageWithLayout} from "./_app";
import React, {ReactElement} from "react";
import Layout from "../components/Layout";
// @ts-ignore
import promotion_banner from "@/assets/images/promotion_banner.png"
// @ts-ignore
import SvgTel from "@/assets/svgs/tel.svg"
import Image from 'next/image'

const Promotion: NextPageWithLayout = () => {
  const data = [
    {
      tel: '+62 5628 **** 73',
    },
    {
      tel: '+62 5628 **** 73',
    },
    {
      tel: '+62 5628 **** 73',
    },
    {
      tel: '+62 5628 **** 73',
    },
    {
      tel: '+62 5628 **** 73',
    },
    {
      tel: '+62 5628 **** 73',
    },
    {
      tel: '+62 5628 **** 73',
    },
    {
      tel: '+62 5628 **** 73',
    },
    {
      tel: '+62 5628 **** 73',
    },
  ]
  return (
    <div>
      <div className="relative h-[150px]">
        <Image layout="fill" objectFit="cover" alt="banner" src={promotion_banner} />
      </div>
      <div className="bg-[#4580F0]">
        <ul className="p-[30px_30px_14px] rounded-t-[24px] bg-[#ffffff]">
          {
            data.map((item, idx) => (
              <li key={idx} className="[border:1px_solid_rgba(53,63,78,0.07)] h-[42px] bg-[#F9F9FC] flex items-center rounded-[3px] mb-[16px]">
                <p className="flex-1 pl-[16px] label-3-regular text-[rgba(51,51,64,0.88)]">{item.tel}</p>
                <Button className="!bg-[#1EA68A] !text-[#ffffff] !h-[42px] !py-0 !border-none !px-[10px] !rounded-[3px] translate-x-[1px] label-2-semi-bold" icon={<SvgTel />} >
                  Kointak
                </Button>
              </li>
            ))
          }
        </ul>
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
