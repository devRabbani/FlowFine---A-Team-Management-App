import Image from 'next/image'
import s from '../styles/Error.module.css'
import svgImg from '../assets/offline.svg'
import Head from 'next/head'

export default function Error500() {
  return (
    <div className={s.body}>
      <Head>
        <title>FlowFine | Offline</title>
      </Head>
      <div className={s.content}>
        <Image src={svgImg} alt="Offline Page" />
        <p>
          You are offline or your internet connection is slow. Please connect to
          stable network
        </p>
        <button className={s.btn} onClick={() => window.location.reload()}>
          Reload
        </button>
      </div>
    </div>
  )
}
