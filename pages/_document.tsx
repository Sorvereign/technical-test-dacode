import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="">
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          media="screen"
          href="https://cdn.rawgit.com/resir014/Clear-Sans-Webfont/v1.1.1/css/clear-sans.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
