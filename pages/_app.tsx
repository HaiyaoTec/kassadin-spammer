import type { AppProps } from 'next/app'
import Head from 'next/head'
import React, {ReactElement, ReactNode} from "react";
import '../styles/globals.css'
import {NextPage} from "next";
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || (pageProps => pageProps)
  return <>
    <Head >
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
