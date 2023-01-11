import { Arrow, Like } from '@react-vant/icons';
import { Card, Button, Toast, Space, Typography, Tag } from 'react-vant';
import {NextPageWithLayout} from "./_app";
import React, {ReactElement} from "react";
import Layout from "../components/Layout";
import { useState } from 'react';
// @ts-ignore
import money from "@/assets/images/money.png"
// @ts-ignore
import nb1 from "@/assets/images/nb1.png"
// @ts-ignore
import nb2 from "@/assets/images/nb2.png"
// @ts-ignore
import nb3 from "@/assets/images/nb3.png"
// @ts-ignore
import ranking_banner from "@/assets/images/ranking_banner.png"
import Image from 'next/image'
import { toNonExponential } from '../utils';

const nbs = [nb1, nb2, nb3]

const Ranking: NextPageWithLayout = () => {
  const data = [
    {
      avatar: 'https://img2.baidu.com/it/u=2015865969,3401990894&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=546',
      userName: 'A****ia',
      traded: 3000,
      koin: 2000000,
    },
    {
      avatar: 'https://img2.baidu.com/it/u=2015865969,3401990894&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=546',
      userName: 'A****ia',
      traded: 3000,
      koin: 2000000,
    },
    {
      avatar: 'https://img2.baidu.com/it/u=2015865969,3401990894&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=546',
      userName: 'A****ia',
      traded: 3000,
      koin: 2000000,
    },
    {
      avatar: 'https://img2.baidu.com/it/u=2015865969,3401990894&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=546',
      userName: 'A****ia',
      traded: 3000,
      koin: 2000000,
    },
    {
      avatar: 'https://img2.baidu.com/it/u=2015865969,3401990894&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=546',
      userName: 'A****ia',
      traded: 3000,
      koin: 2000000,
    },
    {
      avatar: 'https://img2.baidu.com/it/u=2015865969,3401990894&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=546',
      userName: 'A****ia',
      traded: 3000,
      koin: 2000000,
    },
    {
      avatar: 'https://img2.baidu.com/it/u=2015865969,3401990894&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=546',
      userName: 'A****ia',
      traded: 3000,
      koin: 2000000,
    },
    {
      avatar: 'https://img2.baidu.com/it/u=2015865969,3401990894&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=546',
      userName: 'A****ia',
      traded: 3000,
      koin: 2000000,
    },
    {
      avatar: 'https://img2.baidu.com/it/u=2015865969,3401990894&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=546',
      userName: 'A****ia',
      traded: 3000,
      koin: 2000000,
    },
  ]
  return (
    <div>
      <div className="relative h-[150px] bg-[#007CF7]">
        <Image layout="fill" objectFit="cover" alt="banner" src={ranking_banner} />
      </div>
      <div className="bg-[#007CF7]">
        <div className="p-[30px_30px_20px] rounded-t-[24px] bg-[#ffffff]">
          <table className="w-full">
            <thead>
              <tr className="text-[rgba(71,71,101,0.55)] label-3-semi-bold text-left h-[40px] mb-[10px] flex items-center">
                <th className="w-[35px]"></th>
                <th className="flex-1">Agen</th>
                <th className="flex-1 text-center">Traded</th>
                <th className="flex-1 text-right">Koin</th>
              </tr>
            </thead>
            <tbody className="text-[rgba(51,51,64,0.88)]">
              {
                data.map((item, idx) => (
                  <tr key={idx} className="h-[40px] mb-[10px] flex items-center">
                    <td className="w-[35px] label-2-bold text-[rgba(58,58,89,0.33)] flex justify-center items-center">{
                      nbs[idx]
                        ? <Image width={23} height={28} src={nbs[idx]} alt={String(idx + 1)} />
                        : (idx + 1).toString().padStart(2, '0')
                    }</td>
                    <td className="flex items-center flex-1">
                      <Image className="rounded-[50%]" width={30} height={30} src={item.avatar} alt="ava" />
                      <span className="ml-[4px] label-4-semi-bold">{item.userName}</span>
                    </td>
                    <td className="label-4-regular flex-1 text-center">{toNonExponential(item.traded)}</td>
                    <td className="flex items-center justify-end label-4-bold flex-1">
                      <Image alt="" src={money} width={18} height={18} />
                      <span className="ml-[4px] text-[#1EA68A]">{toNonExponential(item.koin)}</span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
Ranking.getLayout = function (page: ReactElement) {
  return (
      <Layout>
        {page}
      </Layout>
  )
}
export default Ranking
