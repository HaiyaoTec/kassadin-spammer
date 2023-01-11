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

const CommodityCard = () => {
    const themeVars = {
        cardRadius: '12px'
    }
    return (<ConfigProvider themeVars={themeVars}>
            <Card round className={'w-full'}>
                <Image src={CardDome} className={'opacity-100'}/>
                <div className={'right-1/2 translate-x-1/2 absolute top-0 w-[94.8%]'}>
                    <Image src={CardTop}/>
                </div>
            </Card>
        </ConfigProvider>
    )
}
const Home: NextPageWithLayout = () => {
  const [visible, setVisible] = useState(true)
    return (
        <Space
            direction="vertical"
            gap={16}
            className={'box-border  flex-auto p-4 w-full bg-[#F8F8FA]'}
        >
            <Notice/>
            <div className={'grid gap-4 grid-cols-[repeat(2,_minmax(0,_1fr))]'}>
                {new Array(7).fill(null).map((_, index) => (
                    <CommodityCard key={index}/>
                ))}
            </div>
          <Button type="primary" round onClick={() => setVisible(true)}>CreateOrderPop Open</Button>
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
export default Home
