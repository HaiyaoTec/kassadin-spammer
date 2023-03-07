import React, {ReactNode, useEffect, useState} from "react";
import {ConfigProvider, NavBar, Tabbar} from "react-vant";
import {useRouter} from "next/router";
import Image from "next/image";
// @ts-ignore
import logo from '@/assets/images/logo.png'
// @ts-ignore
import Service from '@/assets/svgs/service.svg'
// @ts-ignore
import Logout from '@/assets/svgs/logout.svg'
// @ts-ignore
import Home from '@/assets/svgs/home.svg'
// @ts-ignore
import TimeCircle from '@/assets/svgs/timeCircle.svg'
// @ts-ignore
import Document from '@/assets/svgs/document.svg'
// @ts-ignore
import Ranking from '@/assets/svgs/ranking.svg'
import {delCookie, getLocalStorage} from "../utils";
import {Token} from "../api/samira-service-user-httpApi";
import mainApi, {MyToast} from "../api";
import {useWidgetIsReady} from "@livechat/widget-react";
const CustomTabber = () => {
    const [name, setName] = React.useState('/')
    const router = useRouter()
    useEffect(()=>{
        setName(router.pathname)
    },[router.pathname])
    const themeVars = {
        tabbarHeight: '60px',
        tabbarItemIconSize: '24px'
    }
    return (
        <ConfigProvider themeVars={themeVars}>
            <Tabbar  defaultValue={0} inactiveColor={'rgba(71, 71, 101, 0.55)'} activeColor={'#1EA68A'} placeholder fixed
                    value={name} onChange={v => {
                    router.push(`${v}`)
                    setName(v as string)
            }}>
                <Tabbar.Item name='/' icon={ac=><Home fill={ac?'#1EA68A':'#474765'}/>}>
                    Koin
                </Tabbar.Item>
                <Tabbar.Item name='/srecord' icon={ac=><TimeCircle fill={ac?'#1EA68A':'#474765'}/>}>
                    Piwayat
                </Tabbar.Item>
                <Tabbar.Item name='/promotion' icon={ac=><Document fill={ac?'#1EA68A':'#474765'}/>}>
                    pontesional
                </Tabbar.Item>
                <Tabbar.Item name='/ranking' icon={ac=><Ranking fill={ac?'#1EA68A':'#474765'}/>}>
                    pangkat
                </Tabbar.Item>
            </Tabbar>
        </ConfigProvider>
    )
}
const RightBox = ()=>{
    const router = useRouter()
    const [Uid,setUid] = useState(0)
    useEffect(()=>{
        setUid(getLocalStorage<Token>('samira-token').uId||0)
    },[])
    const isReady = useWidgetIsReady()
    const logout = ()=>{
        mainApi.ServiceUserApi.loginOffline().finally(()=>{
            localStorage.removeItem('samira-token')
            delCookie('main_token')
            router.push('/login')
        })
    }
    const openService = ()=>{
        if (isReady){
            // @ts-ignore
            document.getElementById('chat-widget-minimized').contentWindow.document.querySelector('button').click()
        }else {
            MyToast.warning({message:'Tunggu sebentar.'})
        }
    }
    return (<div className={'flex [&>*]:ml-1'}>
        <div className={'label-4-semi-bold px-[6px] py-[11px] border-[rgba(53, 63, 78, 0.07)] border-solid cursor-pointer rounded-[3px] items-center justify-center flex bg-[#F9F9FC] border-[1px]'}>
            <span className={'text-[#333340E0]'}>ID:<span className={'text-[#4747658C]'}>{Uid}</span></span>
        </div>
        <div onClick={openService} className={'px-[10px] py-[6px] cursor-pointer rounded-[3px] items-center justify-center flex bg-[#1EA68A] active:opacity-70'}>
            <Service/>
        </div>
        <div  onClick={logout} className={'px-[10px] py-[5px] border-[rgba(53, 63, 78, 0.07)] border-solid cursor-pointer rounded-[3px] items-center justify-center flex bg-[#F9F9FC] border-[1px] active:opacity-70'}>
            <Logout/>
        </div>
    </div>)
}
const LeftBox = ()=>{

    return (<div className={'w-[119px] h-[30px] relative'}><Image layout={'fill'} objectFit="contain" src={logo} /></div>)
}
const CustomNavBar = ()=>{
    const themeVars = {
        navBarHeight:'50px',
        paddingMd:'12px'
    }
    const router = useRouter()

    return (<ConfigProvider themeVars={themeVars}>
        <NavBar
            onClickLeft={()=>router.push('/')}
            fixed
            placeholder
            leftText={<LeftBox/>}
            rightText={<RightBox/>}
            leftArrow={false}
            safeAreaInsetTop={true}
        />
    </ConfigProvider>)
}
const Layout = (props: { children: ReactNode }) => {
    const {children} = props
    return (
        <main>
            <CustomNavBar/>
            {children}
            <CustomTabber/>
        </main>
    )
}
export default Layout
