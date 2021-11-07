import { Box, SimpleGrid } from "@chakra-ui/react"
import { useURL } from "app/core/hooks/useURL"
import { BoxNewURL } from "app/home/components/box/BoxNewURL"
import { BoxNextPage } from "app/home/components/box/BoxNextPage"
import { BoxShot } from "app/home/components/box/BoxShot"
import findShots from "app/home/queries/findShots"
import { zFindShots } from "app/home/validations/findShots"
import { useInfiniteQuery } from "blitz"
import React, { Fragment, FunctionComponent } from "react"
import { z } from "zod"

type Props = {
  text: string
  onCreateShot(): void
  isLoading: boolean
}

export const BoxShotList: FunctionComponent<Props> = (props) => {
  const url = useURL(props.text)

  const [
    pages,
    { hasNextPage, isFetchingNextPage, fetchNextPage, isFetching },
  ] = useInfiniteQuery(
    findShots,
    (page = { skip: 0 }): z.infer<typeof zFindShots> => {
      return {
        text: props.text.trim(),
        skip: page.skip,
      }
    },
    {
      getNextPageParam(lastPage) {
        return lastPage.nextPage
      },
    }
  )

  const isEmpty = pages.reduce((a, b) => b.count, 0) === 0

  const isNewURL = isEmpty && url !== null && !isFetching

  return (
    <Box>
      <SimpleGrid minChildWidth={"16rem"} gap={0} spacing={0}>
        {pages.map((page, index) => (
          <Fragment key={index}>
            {page.items.map((item) => (
              <BoxShot key={item.id} shot={item} />
            ))}
          </Fragment>
        ))}
        <BoxNextPage
          hasNextPage={hasNextPage ?? false}
          isFetching={isFetching || isFetchingNextPage}
          onFetchNextPage={fetchNextPage}
        />
      </SimpleGrid>
      {isNewURL && (
        <BoxNewURL
          text={props.text}
          onSubmit={props.onCreateShot}
          isLoading={props.isLoading}
        />
      )}
    </Box>
  )
}
