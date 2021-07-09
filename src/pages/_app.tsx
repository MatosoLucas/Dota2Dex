import type { AppProps } from 'next/app'
import { HeroProvider } from '../context/HeroContext'
import '../styles/styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HeroProvider>
      <Component {...pageProps} />
    </HeroProvider>
  )
}
export default MyApp
