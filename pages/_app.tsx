import type {AppProps} from 'next/app'
import Head from 'next/head'
import React, {ReactElement, ReactNode, useEffect, useState} from "react";
import '../styles/globals.css'
import {NextPage} from "next";
import { Analytics } from '@vercel/analytics/react';
import {LiveChatWidget} from "@livechat/widget-react";

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
    const [vw, setVw] = useState(500)
    useEffect(() => {
        setVw(document.body.clientWidth)
        window.onresize = function () {
            setVw(document.body.clientWidth)
        }
    }, [])
    useEffect(() => {
        window.addEventListener('resize', boxHeightChange)
        boxHeightChange()
        return () => {
            window.removeEventListener('resize', boxHeightChange)
        }
    }, [])
    return vw > 500 ?
        <iframe style={{margin: "auto", border: '1px solid #1EA68A'}} width={500} height={'90%'} src={location.href}
                frameBorder="0"></iframe> : <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
                />
            </Head>
            {getLayout(
                <Component {...pageProps} />
            )}
            <LiveChatWidget license="12891963" />
            <Analytics/>
        </>
}

export default MyApp
