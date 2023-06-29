// @ts-ignore
import loginBanner from '@/assets/images/login_banner.png'
import React, {useEffect, useRef, useState} from 'react'
import {Button, Input, Form, Typography, Toast, ConfigProvider, FormInstance} from 'react-vant'
import {useRouter} from "next/router";
// @ts-ignore
import Iphone from '@/assets/svgs/iPhone.svg'
// @ts-ignore
import Lock from '@/assets/svgs/lock.svg'
// @ts-ignore
import Shield from '@/assets/svgs/shield.svg'
// @ts-ignore
import Service from '@/assets/svgs/service.svg'
// @ts-ignore
import User from '@/assets/svgs/user.svg'
// @ts-ignore
import RightSquare from '@/assets/svgs/rightSquare.svg'
import {SpammerLoginParam, SpammerLoginResp} from '../api/kassadin-promot-spammer-api'
import {NextPage} from "next";
import Image from "next/image";
import mainApi, {MyToast} from "../api";
import {setLocalStorage} from "../utils";
import { useWidgetIsReady } from '@livechat/widget-react';

const Uid = () => {
    const [form] = Form.useForm<SpammerLoginParam>()
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    const onFinish = (values: SpammerLoginParam) => {
        setLoading(true)
        const toastLoading = Toast.loading({
            message: 'Masuk..',
            forbidClick: true
        })
        mainApi.SpammerApi.spammerLogin(values).then((res:SpammerLoginResp)=>{
                MyToast.success({message: 'Berhasil masuk'})
                router.push('/')
                // @ts-ignore
                setLocalStorage('agent_token',{token:res.agentToken})
            // window.localStorage.setItem('agent_token', res.agentToken || '')
            }).finally(() => {
                setLoading(false)
                toastLoading.clear()
            })
    }
    return (<Form
        form={form}
        onFinish={onFinish}
        footer={
            <div className={'absolute bottom-[-40px] w-full left-0 translate-y-[100%]'}>
                <Button className={'!rounded-[18px] !border-0 label-1-bold !bg-[#1EA68A]'} loading={loading}
                        nativeType='submit' type='primary' block>
                    Masuk
                </Button>
            </div>
        }
    >
        <Form.Item
            rules={[{required: true, message: 'Identitas tidak bisa kosong'}]}
            name='userName'
            border={false}
            className={'mb-[30px]'}
        >
            <Input
                className="[border:1px_solid_rgba(53,63,78,0.07)] mb-1 bg-[#F9F9FC] h-[50px] px-[16px] rounded-[3px] [&>input]:!text-[rgba(51,51,64,0.88)]"
                placeholder='ID'
                prefix={<User/>}
            />
        </Form.Item>
        <Form.Item
            rules={[{required: true, message: 'Password tidak bisa kosong'}]}
            name='password'
            border={false}
        >
            <Input
                className="[border:1px_solid_rgba(53,63,78,0.07)] mb-1 bg-[#F9F9FC] h-[50px] pl-[16px] rounded-[3px] [&>input]:!text-[rgba(51,51,64,0.88)]"
                placeholder='Kata Sandi'
                prefix={<Lock/>}
                type={'password'}
            />
        </Form.Item>
    </Form>)
}
const Login: NextPage = () => {
    const isReady = useWidgetIsReady()
    const themeVars = {
        cellVerticalPadding: 0,
        cellHorizontalPadding: 0
    }
    const router = useRouter()
    useEffect(() => {
        router.prefetch('/')
    })
    const openService = ()=>{
        if (isReady){
            // @ts-ignore
            document.getElementById('chat-widget-minimized').contentWindow.document.querySelector('button').click()
        }else {
            MyToast.warning({message:'Tunggu sebentar.'})
        }
    }
    return (
        <main className={'bg-[#F9F9FC] flex-1 flex items-center pt-[30%]'}>
            <div
                className={'bg-white py-[30px] px-4  relative  rounded-[16px] w-[calc(100%-84px)] box-login'}>
                <ConfigProvider themeVars={themeVars}>
                    <Uid/>
                </ConfigProvider>
            </div>
        </main>
    )
}

export async function getStaticProps() {
    return {
        props: {}, // will be passed to the page component as props
    }
}

export default Login
