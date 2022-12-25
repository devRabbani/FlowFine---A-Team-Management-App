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
            content="SJzIYsafSkXDHmaqlsz1nOJnhKo_7JsG5bbHuOBXTHk"
          />
          <link rel="apple-touch-icon" href="/logo192.png" />
          {/* <link rel="manifest" href="/manifest.json" /> */}
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
