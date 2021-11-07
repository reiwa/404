import { Text } from "@chakra-ui/react"
import { BoxText } from "app/core/components/BoxText"
import React, { FunctionComponent } from "react"

type Props = {
  isFetching: boolean
  hasNextPage: boolean
  onFetchNextPage(): void
}

export const BoxNextPage: FunctionComponent<Props> = (props) => {
  if (!props.hasNextPage) {
    return null
  }

  return (
    <BoxText
      onClick={() => {
        props.onFetchNextPage()
      }}
    >
      <Text fontWeight={"bold"}>
        {props.isFetching ? "読み込み中" : "もっとみる？"}
      </Text>
    </BoxText>
  )
}
