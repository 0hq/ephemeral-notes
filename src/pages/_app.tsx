import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { JetBrains_Mono } from 'next/font/google'

const inter = JetBrains_Mono({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (<main className={inter.className}>
    <Component {...pageProps} />
  </main>)

}
