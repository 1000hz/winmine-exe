import Document, {Head, Main, NextScript} from "next/document"
import {getInitialProps, getStyles} from "cf-style-nextjs"

export default class MyDocument extends Document {
  static getInitialProps = getInitialProps()

  render() {
    return (
      <html>
        <Head>
          <title>Minesweeper</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <style
            dangerouslySetInnerHTML={{
              __html: `
                *{ box-sizing: border-box; }
                body {
                  margin: 0;
                  background: #11807F;
                  color: #fff;
                }
                html {
                  font-family: Tahoma, "Microsoft Sans Serif", sans-serif;
                  -webkit-font-smoothing: none;
                }
               `
            }}
          />
          {getStyles(this.props)}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
