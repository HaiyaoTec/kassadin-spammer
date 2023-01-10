import type {NextPage} from 'next'
import Image from "next/image";
// @ts-ignore
import loginBanner from '@/assets/images/login_banner.png'
import React, {useState} from 'react'
import {Button, Input, Form, Typography, Toast} from 'react-vant'
import {useRouter} from "next/router";

const Uid = (props: { setMode: (mode: 'phone') => {} | any }) => {
    const {setMode} = props
    const [form] = Form.useForm<any>()
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const onFinish = (values: any) => {
        setLoading(true)
        const toastLoading = Toast.loading({
            message: '登录中...',
            forbidClick: true
        })
        fetch('https://baidu.com/').then(() => {
            Toast.success('登录成功')
            router.replace('/')
        }).catch(() => {
            Toast.fail('登录失败')
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
                <Button loading={loading} round nativeType='submit' type='primary' block>
                    提交
                </Button>
                <Typography.Text onClick={() => {
                    setMode('phone')
                }} center className={'cursor-pointer mt-10 w-full text-semi-bold !text-[#1EA68A]'}>
                    Masuk Dengan Nomor HP
                </Typography.Text>
            </div>
        }
    >
        <Form.Item
            rules={[{required: true, message: '请填写用户名'}]}
            name='username'
            label='用户名'
        >
            <Input placeholder='请输入用户名'/>
        </Form.Item>
        <Form.Item
            rules={[{required: true, message: '请填写密码'}]}
            name='password'
            label='密码'
        >
            <Input placeholder='请输入密码'/>
        </Form.Item>
    </Form>)
}
const Phone = (props: { setMode: (mode: 'uid') => {} | any }) => {
    const {setMode} = props
    const [form] = Form.useForm<any>()
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const onFinish = (values: any) => {
        setLoading(true)
        const toastLoading = Toast.loading({
            message: '登录中...',
            forbidClick: true
        })
        fetch('https://baidu.com/').then(() => {
            Toast.success('登录成功')
            router.replace('/')
        }).catch(() => {
            Toast.fail('登录失败')
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
                <Button loading={loading} round nativeType='submit' type='primary' block>
                    提交
                </Button>
                <Typography.Text onClick={() => {
                    setMode('uid')
                }} center className={'cursor-pointer mt-10 w-full text-semi-bold !text-[#1EA68A]'}>
                    Masuk Dengan ID
                </Typography.Text>
            </div>
        }
    >
        <Form.Item
            rules={[{required: true, message: '请填写用户名'}]}
            name='username'
            label='用户名'
        >
            <Input placeholder='请输入用户名'/>
        </Form.Item>
        <Form.Item
            rules={[{required: true, message: '请填写密码'}]}
            name='password'
            label='密码'
        >
            <Input placeholder='请输入密码'/>
        </Form.Item>
    </Form>)
}
const Login: NextPage = () => {
    const [mode, setMode] = useState<'phone' | 'uid'>('phone')
    return (
        <main className={'flex-1 flex flex-col items-center'}>
            <div className={'w-full'}>
                <Image
                    src={loginBanner}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className={'w-full h-full'}
                />
            </div>
            <div className={'bg-white py-[30px] px-4 mt-[-45%] relative  rounded-[16px] w-[calc(100%-84px)] box-login'}>
                {mode === 'phone' && <Phone setMode={setMode}/>}
                {mode === 'uid' && <Uid setMode={setMode}/>}
            </div>
        </main>
    )
}
export default Login
