import { Html, Head, Main, NextScript } from 'next/document'
import React from "react";
export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="manifest" href="/mask-pwa-manifest.json" />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}
