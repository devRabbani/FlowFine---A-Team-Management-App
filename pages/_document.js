import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="theme-color" content="#90d098" />
          <meta
            name="description"
            content="It is a team management application"
          />
          <meta
            name="google-site-verification"
            content="76C2hWhD9MhyJAHhDRqU-1zoKf3sK3pSFZxhqnXmRo4"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Finlandica:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
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
