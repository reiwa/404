import { Box, Button, Stack, Text } from "@chakra-ui/react"
import { Image, Link } from "blitz"
import React, { FunctionComponent } from "react"

export const BoxPageError404: FunctionComponent = () => {
  return (
    <Stack
      position={"fixed"}
      width={"100%"}
      height={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      p={8}
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={4}
        w={"100%"}
        maxW={"container.lg"}
        align={"center"}
      >
        <Stack alignItems={"center"}>
          <Box
            width={"100%"}
            maxWidth={{ base: 80, md: "container.sm" }}
            filter={
              "invert(88%) sepia(61%) saturate(0%) hue-rotate(229deg) brightness(107%) contrast(101%)"
            }
          >
            <Image
              alt={"404"}
              src={"/linustock/1513420261.png"}
              width={512}
              height={512}
            />
          </Box>
        </Stack>
        <Stack spacing={4} maxW={"32rem"}>
          <Stack spacing={1}>
            <Text sx={{ fontSize: 20, fontWeight: "bold" }}>
              {"お探しのページは見つかりません"}
            </Text>
            <Text fontSize={14}>
              {
                "お探しのページは一時的にアクセスできない状況にあるか、お客さまがわざと存在しないURLを入力した可能性があります。"
              }
            </Text>
          </Stack>
          <Stack direction={"row"}>
            <Link href={"/"}>
              <Button>{"ホームに戻る"}</Button>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
