import { Card, Image, Button, Toast, Space, Typography, Tag, Grid, ConfigProvider } from 'react-vant';
import { NextPageWithLayout } from "./_app";
import React, { ReactElement, useEffect } from "react";
import Layout from "../components/Layout";
import Notice from "../components/Notice";
// @ts-ignore
import CardDome from '@/assets/images/cardDome.png'
// @ts-ignore
import CardTop from '@/assets/images/cardTop.png'
// @ts-ignore
import MaskTop from '@/assets/images/mask_top.png'
// @ts-ignore
import Money from '@/assets/svgs/money.svg'
// @ts-ignore
import money from "@/assets/images/money.png"
// @ts-ignore
import lockBg from "@/assets/images/lockBg.png"
// @ts-ignore
import btnBg from "@/assets/images/btnBg.png"
import { useState } from 'react';
import CreateOrderPop from '../components/CreateOrderPop';
// @ts-ignore
import cardButton from '@/assets/images/cardButton.png'
import mainApi from "../api";
import { CoinGoods, CoinOrderBulletin, ListGoodsRes } from '../api/samira-service-proxyApi';
import { toNonExponential } from "../utils";

const CommodityCard = (props: { good: CoinGoods, onClick: () => void }) => {
  const { good, onClick } = props
  const themeVars = {
    cardRadius: '12px'
  }
  return (<ConfigProvider themeVars={themeVars}>
    <Card onClick={onClick} round className={'w-full'}>
      <Image src={good.background} />
      <div className={'right-1/2 translate-x-1/2 absolute top-0 w-[94.8%]'}>
        <Image src={CardTop} />
        <div className={'text-[12px] top-[15%] absolute flex w-full label-3-bold items-center justify-center text-[#ffffff]'}><Money className={'mr-0.5'} /><span>{toNonExponential(good.income || 0)}</span></div>
      </div>
      <div className={'cursor-pointer right-1/2 translate-x-1/2 absolute bottom-[4.5%] w-[82%]'}>
        <Image src={cardButton} />
        <div className={'text-[16px] text-white absolute top-0 left-0 right-0 bottom-0 flex w-full label-1-bold items-center justify-center'}><span>Rp {toNonExponential(good.price || 0)}</span></div>
      </div>
    </Card>
  </ConfigProvider>
  )
}
const Home: NextPageWithLayout<{ bulletin: CoinOrderBulletin[] }> = (props) => {
  const { bulletin } = props
  const [listGoodsRes, setListGoodsRes] = useState<ListGoodsRes>()
  const [loading, setLoading] = useState<boolean>(true)
  const [curGood, setGood] = useState<CoinGoods | undefined>()
  useEffect(() => {
    mainApi.ServicePayApi.listGoods().then(r => {
      setListGoodsRes(r)
      setLoading(false)
    })
  }, [])
  return (
    <Space
      direction="vertical"
      gap={16}
      className={'box-border  flex-auto p-4 w-full bg-[#F8F8FA]'}
    >
      {
        loading || <>
          {
            listGoodsRes?.lock
              ? <>
                <h1 className="h1-bold text-[#1EA68A] text-center">Pengaktifan</h1>
                <p className="footnote-regular my-[16px] text-[rgba(51,51,64,0.88)]">Top up satu kali ke ID game apa pun untuk mengaktifkan ftur, dan koin yang di Top Updapat dilihat di inbox game</p>
                {
                  listGoodsRes.goods.map((item, key) => (<div key={item.id ?? key}>
                    <div className="bg-[linear-gradient(180deg,_#FFFFFF_0%,_#D7CFFF_56.77%),_linear-gradient(180deg,_#FFFFFF_3.12%,_#BEEBE2_65.1%)] rounded-[12px] px-[16px]">
                      <div className="w-[271px] h-[48px] mx-auto relative z-[1] flex justify-center">
                        <div className="absolute left-0 top-0 w-full h-full"><Image src={MaskTop} /></div>
                        <div className="h-[24px] flex items-center relative mt-[6px]">
                          <Image src={money} width="24" height="24" className="mr-[2.5px]" />
                          <p className="label-2-bold text-[#ffffff]">{toNonExponential(item.income ?? 0)}</p>
                        </div>
                      </div>
                      <div className="w-full h-[225px] -mt-[40px] relative mx-auto">
                        <div className="w-[311px] h-[225px] absolute left-1/2 -translate-x-1/2 top-0">
                          <Image src={lockBg} />
                        </div>
                      </div>
                      <p className="-mt-[20px] footnote-semi-bold text-[#9146FF] text-center pb-[20px]">Jika tidak ada Top Up dalam waktu <span className="text-[#FFB800]">48 jam</span>,fitur akan ditutup!</p>
                    </div>
                    <div className="text-center mt-[24px] mb-[24px]">
                      <Button onClick={() => {
                        setGood(item)
                      }} className="!text-[#ffffff] !h-[50px] w-[236px] !py-0 !border-none !px-[10px] !rounded-[3px] translate-x-[1px] !bg-transparent" >
                        <div className="absolute left-0 top-0 w-full h-full">
                          <Image src={btnBg} />
                        </div>
                        <p className="relative h2-semi-bold !leading-[1em]">Rp {toNonExponential(item.price ?? 0)}</p>
                      </Button>
                    </div>
                  </div>))
                }
              </>
              : <>
                <Notice bulletin={bulletin} />
                <div className={'grid mt-[16px] gap-4 grid-cols-[repeat(2,_minmax(0,_1fr))]'}>
                  {listGoodsRes?.goods.map((good, index) => (
                    <CommodityCard onClick={() => {
                      setGood(good)
                    }} good={good} key={index} />
                  ))}
                </div>
              </>
          }
        </>
      }
      <CreateOrderPop good={curGood} close={() => setGood(undefined)} />
    </Space>
  )
}
Home.getLayout = function (page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
export async function getStaticProps() {
  const bulletin = await mainApi.ServicePayApi.listBulletin()
  return {
    props: { bulletin }, // will be passed to the page component as props
    revalidate: 600
  }
}

export default Home
