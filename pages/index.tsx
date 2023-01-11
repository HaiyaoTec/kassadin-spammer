import {Card, Image, Button, Toast, Space, Typography, Tag, Grid, ConfigProvider} from 'react-vant';
import {NextPageWithLayout} from "./_app";
import React, {ReactElement} from "react";
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
const CommodityCard = () => {
    const themeVars = {
        cardRadius: '12px'
    }
    return (<ConfigProvider themeVars={themeVars}>
            <Card round className={'w-full'}>
                <Image src={CardDome} className={'opacity-70'}/>
                <div className={'right-1/2 translate-x-1/2 absolute top-0 w-[94.8%]'}>
                    <Image src={CardTop}/>
                    <div className={'text-[3.75vw] top-[15%] absolute flex w-full label-3-bold items-center justify-center text-[#E49BB4]'}><Money className={'mr-0.5'}/><span>300.000.000</span></div>
                </div>
                <div className={'cursor-pointer right-1/2 translate-x-1/2 absolute bottom-[6%] w-[81%]'}>
                    <Image src={cardButton}/>
                    <div className={'text-[4.8vw] text-white bottom-[35%] absolute flex w-full label-1-bold items-center justify-center'}><span>Rp 300</span></div>
                </div>
            </Card>
        </ConfigProvider>
    )
}
const Home: NextPageWithLayout = () => {
  const [visible, setVisible] = useState(false)
    return (
        <Space
            direction="vertical"
            gap={16}
            className={'box-border  flex-auto p-4 w-full bg-[#F8F8FA]'}
        >
            <Notice/>
            <div className={'grid gap-4 grid-cols-[repeat(2,_minmax(0,_1fr))]'}>
                {new Array(7).fill(null).map((_, index) => (
                    <CommodityCard  key={index}/>
                ))}
            </div>
          <CreateOrderPop  open={visible} close={() => setVisible(false)} />
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
    return {
        props: {}, // will be passed to the page component as props
    }
}

export default Home
