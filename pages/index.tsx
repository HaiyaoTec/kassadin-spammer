import {Card, Image, Button, Toast, Space, Typography, Tag, Grid, ConfigProvider} from 'react-vant';
import {NextPageWithLayout} from "./_app";
import React, {ReactElement, useEffect} from "react";
import Layout from "../components/Layout";
import Notice from "../components/Notice";
// @ts-ignore
import CardDome from '@/assets/images/cardDome.png'
// @ts-ignore
import CardTop from '@/assets/images/cardTop.png'
// @ts-ignore
import Money from '@/assets/svgs/money.svg'
import { useState } from 'react';
import CreateOrderPop from '../components/CreateOrderPop';
// @ts-ignore
import cardButton from '@/assets/images/cardButton.png'
import mainApi from "../api";
import {CoinGoods, CoinOrderBulletin} from "../api/samira-service-proxyApi";
import {toNonExponential} from "../utils";

const CommodityCard = (props:{good:CoinGoods,onClick:()=>void}) => {
    const {good,onClick} = props
    const themeVars = {
        cardRadius: '12px'
    }
    return (<ConfigProvider themeVars={themeVars}>
            <Card onClick={onClick} round className={'w-full'}>
                <Image src={good.background}/>
                <div className={'right-1/2 translate-x-1/2 absolute top-0 w-[94.8%]'}>
                    <Image src={CardTop}/>
                    <div className={'text-[12px] top-[15%] absolute flex w-full label-3-bold items-center justify-center text-[#E49BB4]'}><Money className={'mr-0.5'}/><span>{toNonExponential(good.income||0)}</span></div>
                </div>
                <div className={'cursor-pointer right-1/2 translate-x-1/2 absolute bottom-[6%] w-[81%]'}>
                    <Image src={cardButton}/>
                    <div className={'text-[16px] text-white bottom-[31%] absolute flex w-full label-1-bold items-center justify-center'}><span>Rp {toNonExponential(good.price||0)}</span></div>
                </div>
            </Card>
        </ConfigProvider>
    )
}
const Home: NextPageWithLayout<{goods:CoinGoods[],bulletin:CoinOrderBulletin[]}> = (props) => {
  const {goods,bulletin }= props
  const [curGood,setGood] = useState<CoinGoods|undefined>()
    return (
        <Space
            direction="vertical"
            gap={16}
            className={'box-border  flex-auto p-4 w-full bg-[#F8F8FA]'}
        >
            <Notice bulletin={bulletin}/>
            <div className={'grid gap-4 grid-cols-[repeat(2,_minmax(0,_1fr))]'}>
                {goods.map((good, index) => (
                    <CommodityCard onClick={()=>{
                        setGood(good)
                    }} good={good} key={index}/>
                ))}
            </div>
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
    const goods = await mainApi.ServicePayApi.listGoods()
    const bulletin = await mainApi.ServicePayApi.listBulletin()
    return {
        props: {goods,bulletin}, // will be passed to the page component as props
        revalidate: 600
    }
}

export default Home
