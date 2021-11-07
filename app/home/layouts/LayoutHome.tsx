import { BoxPageHomeFallback } from "app/home/components/box/BoxPageHomeFallback"
import { Head } from "blitz"
import React, { FunctionComponent, Suspense } from "react"

export const LayoutHome: FunctionComponent = (props) => {
  return (
    <>
      <Head>
        <title>{"404.Fish"}</title>
        <link rel={"icon"} href={"/favicon.ico"} />
      </Head>
      <Suspense fallback={<BoxPageHomeFallback />}>{props.children}</Suspense>
    </>
  )
}
