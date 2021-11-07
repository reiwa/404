import { Stack } from "@chakra-ui/layout"
import { useToast } from "@chakra-ui/react"
import { captureException } from "@sentry/react"
import { BoxSearch } from "app/home/components/box/BoxSearch"
import { BoxShotList } from "app/home/components/box/BoxShotList"
import { LayoutHome } from "app/home/layouts/LayoutHome"
import createShot from "app/home/mutations/createShot"
import { BlitzPage, useMutation } from "blitz"
import React, { Suspense, useState } from "react"

const PageHome: BlitzPage = () => {
  const [text, setText] = useState("")

  const [createShotMutation, { isLoading }] = useMutation(createShot, {})

  const onChangeText = (value: string) => {
    setText(value)
  }

  const toast = useToast()

  const onCreateShot = async () => {
    try {
      const result = await createShotMutation({ url: text })

      toast({
        title: "ありがとうございます",
        description: `新しいURL（${result.url}）を追加しました。`,
        status: "success",
      })
    } catch (error) {
      captureException(error)

      if (error instanceof Error) {
        toast({
          title: error.name,
          description: error.message,
          status: "error",
        })
      }
    }
  }

  return (
    <Stack spacing={0}>
      <BoxSearch
        text={text}
        onChangeText={onChangeText}
        isLoading={isLoading}
      />
      <Suspense fallback={null}>
        <BoxShotList
          text={text}
          isLoading={isLoading}
          onCreateShot={onCreateShot}
        />
      </Suspense>
    </Stack>
  )
}

PageHome.suppressFirstRenderFlicker = true

PageHome.getLayout = (page) => {
  return <LayoutHome>{page}</LayoutHome>
}

export default PageHome
