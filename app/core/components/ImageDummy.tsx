import { Image } from "blitz"
import React, { FunctionComponent } from "react"

export const ImageDummy: FunctionComponent = () => {
  return (
    <Image
      alt={"dummy"}
      width={1024}
      height={1024}
      src={
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
      }
    />
  )
}
