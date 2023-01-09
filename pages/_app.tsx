import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from "react";
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head >
      <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
      />
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
