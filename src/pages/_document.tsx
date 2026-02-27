import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends NextDocument {
  render() {
    return (
      <Html lang="es">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
