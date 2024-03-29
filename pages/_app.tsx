import type {AppProps} from 'next/app'
import Head from 'next/head'
import React, {ReactElement, ReactNode, useEffect, useRef, useState} from "react";
import '../styles/globals.css'
import {NextPage} from "next";
import { Analytics } from '@vercel/analytics/react';
import {LiveChatWidget} from "@livechat/widget-react";
import {useRouter} from "next/router";
import 'react-vant/es/styles';
import {EventBus} from "../utils/EventBus";
const Emitter = new EventBus();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}
const boxHeightChange = () => {
    document.documentElement.style.setProperty('--pop-height', `${window.innerHeight}px`)
}
function MyApp({Component, pageProps}: AppPropsWithLayout) {
    const getLayout = Component.getLayout || (pageProps => pageProps)
    const router = useRouter()
    useEffect(() => {
        window.addEventListener('resize', boxHeightChange)
        boxHeightChange()
        const model = document.getElementById('model')
        if (model){
            model.onload = (e)=>{
                alert(e)
            }
        }
        return () => {
            window.removeEventListener('resize', boxHeightChange)
        }
    }, [])
    useEffect(()=>{
        if (self != top) {
            const url = `${router.asPath}`
            window.parent.history.replaceState({url: url}, '', url)
        }
    },[router.pathname])
        return <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
                />
            </Head>
            {getLayout(
                <Component {...pageProps} />
            )}
        </>
}

export default MyApp
