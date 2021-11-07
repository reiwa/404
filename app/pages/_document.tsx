import { BlitzScript, Document, DocumentHead, Html, Main } from "blitz"

class MyDocument extends Document {
  render() {
    const fontURL =
      "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500;700&display=swap"

    return (
      <Html lang={"ja"}>
        <DocumentHead>
          <link rel={"preconnect"} href={"https://fonts.googleapis.com"} />
          <link
            rel={"preconnect"}
            href={"https://fonts.gstatic.com"}
            crossOrigin={""}
          />
          <link href={fontURL} rel={"stylesheet"} />
        </DocumentHead>
        <body>
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
