import React, {ReactNode, useEffect} from "react";
import {ConfigProvider, NavBar, Tabbar} from "react-vant";
import {FriendsO, HomeO, SettingO} from "@react-vant/icons";
import {useRouter} from "next/router";
import Image from "next/image";
// @ts-ignore
import logo from '@/assets/images/logo.png'
// @ts-ignore
import Service from '@/assets/svgs/service.svg'
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
        return (<div>
            <div className={'bg-[#1EA68A]'}>
                <Service/>
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

            // onClickLeft={() => Toast('返回')}
            // onClickRight={() => Toast('按钮')}
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
