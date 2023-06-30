import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { JetBrains_Mono } from 'next/font/google'

const jetbrains = JetBrains_Mono({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ephemeral Notes</title>
        <meta name="description" content="Impermanent thoughts, impermanent notes." />
        <meta property="og:title" content="Ephemeral Notes" />
        <meta property="og:description" content="Impermanent thoughts, impermanent notes." />
        <meta property="og:url" content="https://ephemeral-notes.com" />
        <meta property="og:site_name" content="Ephemeral Notes" />
        <meta property="og:image" content="https://ephemeral-notes.com/static/OpenGraphEphemeral.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en-US" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ephemeral Notes" />
        <meta name="twitter:description" content="Impermanent thoughts, impermanent notes." />
        <meta name="twitter:site" content="@willdepue" />
        <meta name="twitter:site:id" content="998575387067142144" />
        <meta name="twitter:image" content="https://ephemeral-notes.com/static/OpenGraphEphemeral.png" />
      </Head>
      <main className={jetbrains.className}>
        <Component {...pageProps} />
      </main>
    </>)

}
