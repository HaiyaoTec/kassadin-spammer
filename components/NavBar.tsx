import {useRouter} from "next/router";
import {Button, ConfigProvider, Form, Input, NavBar, Popup} from "react-vant";
import React, {useEffect, useState} from "react";
import {delCookie} from "../utils";
// @ts-ignore
import Logout from "@/assets/svgs/logout.svg";
import Image from "next/image";
// @ts-ignore
import logo from "@/assets/images/logo.png";
import Select from "react-select";
import {SelectOption, Spammer, SpammerCheckParam} from "../api/kassadin-promot-spammer-api";
import mainApi from "../api";

const RightBox = ()=>{
    const router = useRouter()
    const [enterPop,setEnterPop]=useState(false)
    //组员列表
    const [members,setMembers]=useState<SelectOption[]>([])
    //当前选择的组员
    const [spammerMember,setSpammerMember]=useState<SelectOption>({label: "", value: ""})
    //组员登记参数
    const [spammerCheckParams,setScp]=useState<SpammerCheckParam>({spammerName: "", uId: "", whatsApp: ""})

    const logout = ()=>{
            localStorage.removeItem('agent_token')
            delCookie('agent_token')
            router.push('/login')
    }
    const getSpammerMembers = ()=>{
        mainApi.SpammerApi.getSpammerMembers().then(res=>{
            console.log(res)
            let members:any[] = [];
            res.map(item=>{
                members.push({value:item.userName,label:item.userName})
            })
            setScp(Object.assign(spammerCheckParams,{spammerName:members[0].value}))
            setSpammerMember(members[0])
            // @ts-ignore
            setMembers(members);
        })
    }
    const checkSpammer = (val:SpammerCheckParam)=>{
        console.log(val)
        setScp(Object.assign(spammerCheckParams,val));
        mainApi.SpammerApi.spammerCheck(spammerCheckParams).then(res=>{
            console.log(res)
        })
    }

    useEffect(()=>{

    },[])
    return (<div className={'flex [&>*]:ml-1'}>
        <div onClick={()=>{
            setEnterPop(true);
            getSpammerMembers();
        }} className={'text-white px-[10px] py-[6px] cursor-pointer rounded-[3px] items-center justify-center flex bg-[#1EA68A] active:opacity-70'}>
            Kirim Hadiah
        </div>
        <div  onClick={logout} className={'px-[10px] py-[5px] border-[rgba(53, 63, 78, 0.07)] border-solid cursor-pointer rounded-[3px] items-center justify-center flex bg-[#F9F9FC] border-[1px] active:opacity-70'}>
            <Logout/>
        </div>
        <Popup
            visible={enterPop}
            closeable
            style={{ padding: '16px 16px 40px ' }}
            position='bottom'
            round
            onClose={() => setEnterPop(false)}
        >
            <h3 className={'py-4 text-center label-1-semi-bold text-[#1EA68A]'}>Kirim Hadiah</h3>
            <Form
                onFinish={checkSpammer}
                footer={
                    <div style={{ margin: '16px 16px 0' }}>
                        <Button className={'!bg-[#1EA68A] !rounded-[4px] !border-none'} nativeType='submit' type='primary' block>Confirm</Button>
                    </div>
                }
            >
                <Form.Item border={false}
                          name={'whatsApp'} rules={[{ required: true, message: '请填写WA' },{pattern:/^\d{10,}$/,message: '至少10位数字'}]}>
                    <div className={'w-full'}>
                        <p className={'text-[rgba(71,71,101,0.55)] mb-[4px]'}>WA</p>
                        <Input  className="[border:1px_solid_rgba(53,63,78,0.07)] mb-1 h-[38px] px-[16px] rounded-[3px] [&>input]:!text-[rgba(51,51,64,0.88)]" type={'number'}/>
                    </div>
                </Form.Item>
                <Form.Item border={false}
                          name={'uId'} rules={[{ required: true, message: '请填写UID' },{pattern:/^\d{10,}$/,message: '至少10位数字'}]}>
                    <div  className={'w-full'}>
                        <p className={'text-[rgba(71,71,101,0.55)] mb-[4px]'}>UID</p>
                        <Input  className="[border:1px_solid_rgba(53,63,78,0.07)] mb-1  h-[38px] px-[16px] rounded-[3px] [&>input]:!text-[rgba(51,51,64,0.88)]" type={'number'}/>
                    </div>
                </Form.Item>
                <Form.Item border={false}>
                    <div>
                        <p className={'text-[rgba(71,71,101,0.55)] mb-[8px]'}>Mitra</p>
                    </div>
                </Form.Item>
                <div className={'px-4 '}>
                    <Select
                        onChange={(val)=>{
                            console.log(val)
                            // @ts-ignore
                            setSpammerMember(val)
                            setScp(Object.assign(spammerCheckParams,{spammerName:val?.value}))
                        }}
                        styles={{
                            menu: () => ({
                                position:'absolute',
                                width:'100%',
                                background:'#fff',
                                border:'1px solid hsl(0, 0%, 80%)',
                                maxHeight:'90px',
                                overflowY:'scroll',
                                zIndex:9
                            })
                        }}
                        value={spammerMember}
                        options={members}
                    />
                </div>
            </Form>
        </Popup>
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

export default CustomNavBar
