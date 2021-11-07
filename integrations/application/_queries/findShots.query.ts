import { captureException } from "@sentry/node"
import db from "db"
import { ShortText, Skip, Take, UrlFactory } from "integrations/domain"
import { InternalError } from "integrations/errors"
import { AppShotMinimal } from "integrations/interface/types"
import { injectable } from "tsyringe"

type Props = {
  text: ShortText
  take: Take
  skip: Skip
}

@injectable()
export class FindShotsQuery {
  async execute(props: Props) {
    const hostname = props.text.isURL
      ? UrlFactory.fromText(props.text.value).hostname
      : props.text.value

    try {
      const prismaShots = await db.shot.findMany({
        take: props.take.value,
        skip: props.skip.value,
        orderBy: { createdAt: "desc" },
        where: {
          hostname: { contains: hostname },
        },
        include: { files: true },
      })

      return prismaShots.map((prismaShot): AppShotMinimal => {
        const [file] = prismaShot.files

        if (typeof file === "undefined") {
          throw new InternalError()
        }

        return {
          id: prismaShot.id,
          title: prismaShot.title,
          hostname: prismaShot.hostname,
          file: {
            id: file.id,
            width: file.width,
            height: file.height,
            url: file.url,
          },
        }
      })
    } catch (error) {
      captureException(error)

      if (error instanceof Error) {
        return new InternalError(error.message)
      }

      return new InternalError()
    }
  }
}
