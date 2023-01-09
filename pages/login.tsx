import type { NextPage } from 'next'
import Image from "next/image";
// @ts-ignore
import loginBanner from '@/assets/images/login_banner.png'
const Login:NextPage = () => {
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
            <div className={'mt-[-45%] relative bg-red-50 rounded-[16px] h-[234px] w-[calc(100%-84px)] box-login'}></div>
        </main>
   )
}
export default Login
