// @ts-ignore
import loginBanner from '@/assets/images/login_banner.png'
import React, {useEffect, useState} from 'react'
import {Button, Input, Form, Typography, Toast, ConfigProvider, FormInstance} from 'react-vant'
import {useRouter} from "next/router";
// @ts-ignore
import Iphone from '@/assets/svgs/iPhone.svg'
// @ts-ignore
import Lock from '@/assets/svgs/lock.svg'
// @ts-ignore
import Shield from '@/assets/svgs/shield.svg'
// @ts-ignore
import User from '@/assets/svgs/user.svg'
// @ts-ignore
import RightSquare from '@/assets/svgs/rightSquare.svg'
import {Login as LoginDto, Token} from '../api/samira-service-user-httpApi'
import {NextPage} from "next";
import Image from "next/image";
import mainApi, {MyToast} from "../api";
import {setLocalStorage} from "../utils";

const Uid = (props: { setMode: (mode: 'phone') => {} | any }) => {
    const {setMode} = props
    const [form] = Form.useForm<LoginDto>()
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const onFinish = (values: LoginDto) => {
        setLoading(true)
        const toastLoading = Toast.loading({
            message: 'Masuk..',
            forbidClick: true
        })
        mainApi.ServiceUserApi.loginPassword(values).then((res) => {
            MyToast.success({message: 'Berhasil masuk'})
            router.push('/')
            setLocalStorage<Token>('samira-token', res)
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
                <Typography.Text onClick={() => {
                    setMode('phone')
                }} center className={'justify-center !flex cursor-pointer mt-10 w-full text-semi-bold !text-[#1EA68A]'}>
                    Masuk Dengan ID <RightSquare className={'inline ml-1.5'}/>
                </Typography.Text>
            </div>
        }
    >
        <Form.Item
            rules={[{required: true, message: 'Identitas tidak bisa kosong'}]}
            name='uId'
            border={false}
            className={'mb-[30px]'}
        >
            <Input
                className="[border:1px_solid_rgba(53,63,78,0.07)] mb-1 bg-[#F9F9FC] h-[50px] px-[16px] rounded-[3px] [&>input]:!text-[rgba(51,51,64,0.88)]"
                placeholder='ID'
                prefix={<User/>}
                type={'number'}
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
const Phone = (props: { setMode: (mode: 'uid') => {} | any }) => {
    const {setMode} = props
    const [form] = Form.useForm<LoginDto>()
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const onFinish = (values: LoginDto) => {

        setLoading(true)
        const toastLoading = Toast.loading({
            message: 'Masuk..',
            forbidClick: true
        })
        mainApi.ServiceUserApi.loginPhoneNumber(values).then((res) => {
            MyToast.success({message: 'Berhasil masuk'})
            setLocalStorage<Token>('samira-token', res)
            router.push('/')
        }).finally(() => {
            setLoading(false)
            toastLoading.clear()
        })
    }
    const Send = (props: { form: FormInstance }) => {
        const {form} = props
        const [loading, setLoading] = useState<boolean>(false)
        const [txt, setText] = useState('Dapatkan')
        const time = (val: number = 60) => {
            if (val > 0) {
                setText(`${val}s`)
                setTimeout(() => {
                    time(--val)
                }, 1000)
            } else setText('Dapatkan')
        }
        const sendVerification = async () => {
            await form.validateFields(['phoneNumber'])
            setLoading(true)
            mainApi.ServiceUserApi.loginSendVerificationCode({phoneNumber: form.getFieldValue('phoneNumber')}).then(() => {
                MyToast.success({message: 'Kirim sukses'})
                time()
            }).finally(() => {
                setLoading(false)
            })
        }
        return (<Button
            onClick={sendVerification}
            loading={loading}
            className={'!rounded-[3px] min-w-[91px] !text-white label-2-semi-bold !h-[50px] !py-[12px] !px-[10px] !border-0 !bg-[#1EA68A]'}
            block>{txt}</Button>)
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
                <Typography.Text onClick={() => {
                    setMode('uid')
                }} center className={'justify-center !flex cursor-pointer mt-10 w-full text-semi-bold !text-[#1EA68A]'}>
                    Masuk Dengan ID <RightSquare className={'inline ml-1.5'}/>
                </Typography.Text>
            </div>
        }
    >
        <Form.Item
            rules={[{required: true, message: 'Nomor telepon tidak boleh kosong'}]}
            name='phoneNumber'
            border={false}
            className={'mb-[30px]'}
        >
            <Input
                className="[border:1px_solid_rgba(53,63,78,0.07)] mb-1 bg-[#F9F9FC] h-[50px] px-[16px] rounded-[3px] [&>input]:!text-[rgba(51,51,64,0.88)]"
                placeholder='62 Nomor HP'
                prefix={<Iphone/>}
                type={'number'}
            />
        </Form.Item>
        <Form.Item
            rules={[{required: true, message: 'Kode otentikasi tidak bisa kosong'}]}
            name='verificationCode'
            border={false}
        >
            <Input
                className="[border:1px_solid_rgba(53,63,78,0.07)] mb-1 bg-[#F9F9FC] h-[50px] pl-[16px] rounded-[3px] [&>input]:!text-[rgba(51,51,64,0.88)]"
                placeholder='Kode Verifikasi'
                prefix={<Shield/>}
                suffix={<Send form={form}/>}
                type={'number'}
            />
        </Form.Item>
        <Typography.Text className={'footnote-regular !text-[#3A3A5954] !text-[12px]'}>
            Jika Anda tidak memiliki akun, akun baru untuk Anda saatAnda masuk
        </Typography.Text>
    </Form>)
}
const Login: NextPage = () => {
    const [mode, setMode] = useState<'phone' | 'uid'>('phone')
    const themeVars = {
        cellVerticalPadding: 0,
        cellHorizontalPadding: 0
    }
    const router = useRouter()
    useEffect(() => {
        router.prefetch('/')
    })
    return (
        <main className={'flex-1 flex flex-col items-center'}>
            <div className={'w-full'}>
                <Image src={loginBanner}
                       width="0"
                       height="0"
                       sizes="100vw"
                       className={'w-full h-full'}/>
            </div>
            <div
                className={'bg-white py-[30px] px-4 mt-[-45%] relative  rounded-[16px] w-[calc(100%-84px)] box-login'}>
                <ConfigProvider themeVars={themeVars}>
                    {mode === 'phone' && <Phone setMode={setMode}/>}
                    {mode === 'uid' && <Uid setMode={setMode}/>}
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
