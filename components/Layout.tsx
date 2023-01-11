import React, {ReactNode, useEffect} from "react";
import {ConfigProvider, NavBar, Tabbar} from "react-vant";
import {FriendsO, HomeO, SettingO} from "@react-vant/icons";
import {useRouter} from "next/router";
import Image from "next/image";
// @ts-ignore
import logo from '@/assets/images/logo.png'
// @ts-ignore
import Service from '@/assets/svgs/service.svg'
// @ts-ignore
import Logout from '@/assets/svgs/logout.svg'
const CustomTabber = () => {
    const [name, setName] = React.useState('/')
    const router = useRouter()
    useEffect(()=>{
        router.push(`${name}`)
    },[name])
    const themeVars = {
        tabbarHeight: '60px',
        tabbarItemIconSize: '24px'
    }
    return (
        <ConfigProvider themeVars={themeVars}>
            <Tabbar  defaultValue={0} inactiveColor={'rgba(71, 71, 101, 0.55)'} activeColor={'#1EA68A'} placeholder fixed
                    value={name} onChange={v => setName(v as string)}>
                <Tabbar.Item name='/' icon={<HomeO/>}>
                    Koin
                </Tabbar.Item>
                <Tabbar.Item name='/srecord' icon={<HomeO/>}>
                    Piwayat
                </Tabbar.Item>
                <Tabbar.Item name='/promotion' icon={<FriendsO/>}>
                    pontesional
                </Tabbar.Item>
                <Tabbar.Item name='/ranking' icon={<SettingO/>}>
                    pangkat
                </Tabbar.Item>
            </Tabbar>
        </ConfigProvider>
    )
}

const CustomNavBar = ()=>{

    const RightBox = ()=>{
        return (<div className={'flex [&>*]:ml-1'}>
            <div className={'label-4-semi-bold px-[6px] py-[11px] border-[rgba(53, 63, 78, 0.07)] border-solid cursor-pointer rounded-[3px] items-center justify-center flex bg-[#F9F9FC] border-[1px]'}>
                <span className={'text-[#333340E0]'}>ID:<span className={'text-[#4747658C]'}>123123</span></span>
            </div>
            <div className={'px-[10px] py-[6px] cursor-pointer rounded-[3px] items-center justify-center flex bg-[#1EA68A]'}>
                <Service/>
            </div>
            <div className={'px-[10px] py-[5px] border-[rgba(53, 63, 78, 0.07)] border-solid cursor-pointer rounded-[3px] items-center justify-center flex bg-[#F9F9FC] border-[1px]'}>
                <Logout/>
            </div>
        </div>)
    }
    const LeftBox = ()=>{
        return (<div className={'w-[119px] h-[30px] relative'}><Image layout={'fill'} src={logo} /></div>)
    }
    const themeVars = {
        navBarHeight:'50px',
        paddingMd:'12px'
    }
    return (<ConfigProvider themeVars={themeVars}>
        <NavBar
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
