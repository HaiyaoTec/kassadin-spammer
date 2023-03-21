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
            <script dangerouslySetInnerHTML={{
                __html: `if ('serviceWorker' in navigator) {
                    window.addEventListener('load', function() {
                    navigator.serviceWorker.register('sw.js')
                        .then(function(registration) {})
                        .catch(function(err) {})
                    })
                }`
            }}></script>
            </body>
        </Html>
    )
}
