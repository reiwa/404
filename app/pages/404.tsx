import { BoxPageError404 } from "app/core/components/BoxPageError404"
import { BlitzPage, Head } from "blitz"
import React from "react"

const Page404: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>{"404.Fish"}</title>
      </Head>
      <BoxPageError404 />
    </>
  )
}

export default Page404
