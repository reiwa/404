import { Box, Stack, Text, useColorMode } from "@chakra-ui/react"
import { ImageDummy } from "app/core/components/ImageDummy"
import React, { FunctionComponent } from "react"

type Props = {
  onClick?(): void
}

export const BoxText: FunctionComponent<Props> = (props) => {
  const { colorMode } = useColorMode()

  const isDarkMode = colorMode === "dark"

  const isClickable = typeof props.onClick !== "undefined"

  return (
    <Box
      display={"flex"}
      cursor={isClickable ? "pointer" : "initial"}
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      _hover={isClickable ? { bg: isDarkMode ? "gray.900" : "gray.100" } : {}}
      position={"relative"}
      onClick={props.onClick}
    >
      <ImageDummy />
      <Stack
        justify={"center"}
        align={"center"}
        w={"100%"}
        h={"100%"}
        position={"absolute"}
        top={0}
        left={0}
      >
        <Text fontWeight={"bold"}>{props.children}</Text>
      </Stack>
    </Box>
  )
}
