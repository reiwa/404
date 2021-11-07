import { Button } from "@chakra-ui/button"
import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import React, { FunctionComponent } from "react"

type Props = {
  text: string
  onSubmit(): void
  isLoading: boolean
}

export const BoxNewURL: FunctionComponent<Props> = (props) => {
  const url = new URL(props.text)

  return (
    <Box px={4} pt={4} w={"100%"}>
      <Stack spacing={4} w={"100%"} maxW={96}>
        <Stack spacing={0}>
          <Text fontWeight={"bold"}>
            {"このサイトはまだデータベースにありません。"}
          </Text>
          <Text fontWeight={"bold"} fontSize={32}>
            {url.hostname}
          </Text>
        </Stack>
        <HStack>
          <Button
            onClick={props.onSubmit}
            isLoading={props.isLoading}
            loadingText={"追加する"}
          >
            {"追加する"}
          </Button>
        </HStack>
      </Stack>
    </Box>
  )
}
