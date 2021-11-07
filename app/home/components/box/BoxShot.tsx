import { Box } from "@chakra-ui/react"
import { Image } from "blitz"
import { AppShotMinimal } from "integrations/interface/types"
import React, { FunctionComponent } from "react"

type Props = {
  shot: AppShotMinimal
}

export const BoxShot: FunctionComponent<Props> = (props) => {
  return (
    <Box display={"flex"}>
      <Image
        alt={props.shot.title}
        width={props.shot.file.width}
        height={props.shot.file.height}
        src={props.shot.file.url}
      />
    </Box>
  )
}
