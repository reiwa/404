import { captureException } from "@sentry/node"
import { withSentryForApi } from "app/core/utils/withSentryForApi"
import { BlitzApiHandler } from "blitz"
import { CreateFileService } from "integrations/application"
import { Id } from "integrations/domain"
import "reflect-metadata"
import { container } from "tsyringe"

/**
 * https://github.com/vercel/vercel/issues/4739
 * @param req
 * @param resp
 */
const screenshot: BlitzApiHandler = async (req, resp) => {
  try {
    const shotId = req.query.shotId

    if (typeof shotId !== "string") {
      resp.status(500).end()

      return
    }

    const file = req.body as Buffer

    const createFileService = container.resolve(CreateFileService)

    await createFileService.execute({
      file,
      shotId: new Id(shotId),
    })

    resp.end(file)
  } catch (error) {
    captureException(error)

    console.error(error)

    resp.status(500).end()
  }
}

export default withSentryForApi(screenshot, "screenshot")
