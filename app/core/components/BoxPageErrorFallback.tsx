import { BoxPageError } from "app/core/components/BoxPageError"
import { ErrorFallbackProps } from "blitz"
import React, { FunctionComponent } from "react"

type Props = ErrorFallbackProps

export const BoxPageErrorFallback: FunctionComponent<Props> = (props) => {
  console.log(props)

  return <BoxPageError />
}
