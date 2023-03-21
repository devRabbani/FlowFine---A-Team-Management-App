import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="application-name" content="FlowFine" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="FlowFine" />
          <meta
            name="description"
            content="Effortlessly manage tasks on-the-go with our user-friendly mobile app! With its lightweight and PWA features, it ensures seamless team collaboration without any lag. Best of all, it's completely free to use!"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#02343b" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#02343b" />

          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/logo384.png" color="#02343b" />
          <link rel="shortcut icon" href="/favicon.ico" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://flowfine.vercel.app" />
          <meta
            name="twitter:title"
            content="FlowFine - Your All-in-One Project Management Solution!"
          />
          <meta
            name="twitter:description"
            content="Effortlessly manage tasks on-the-go with our user-friendly mobile app! With its lightweight and PWA features, it ensures seamless team collaboration without any lag. Best of all, it's completely free to use!"
          />
          <meta
            name="twitter:image"
            content="https://flowfine.vercel.app/ogimage.png"
          />
          <meta name="twitter:creator" content="@iamrrk_" />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="FlowFine - Your All-in-One Project Management Solution!"
          />
          <meta
            property="og:description"
            content="Effortlessly manage tasks on-the-go with our user-friendly mobile app! With its lightweight and PWA features, it ensures seamless team collaboration without any lag. Best of all, it's completely free to use!"
          />
          <meta property="og:site_name" content="FlowFine" />
          <meta property="og:url" content="https://flowfine.vercel.app" />
          <meta
            property="og:image"
            content="https://flowfine.vercel.app/ogimage.png"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
