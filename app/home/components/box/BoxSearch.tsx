import { Box, Input } from "@chakra-ui/react"
import React, { FunctionComponent } from "react"

type Props = {
  text: string
  onChangeText(text: string): void
  isLoading: boolean
}

export const BoxSearch: FunctionComponent<Props> = (props) => {
  return (
    <Box>
      <Input
        rounded={0}
        isDisabled={props.isLoading}
        placeholder={"WebサイトのURL"}
        variant={"filled"}
        value={props.text}
        onChange={(event) => {
          props.onChangeText(event.target.value)
        }}
      />
    </Box>
  )
}
