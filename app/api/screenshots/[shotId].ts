import { captureException } from "@sentry/node"
import { withSentryForApi } from "app/core/utils/withSentryForApi"
import axios from "axios"
import { BlitzApiHandler } from "blitz"
import { CreateFileService } from "integrations/application"
import { Id } from "integrations/domain"
import "reflect-metadata"
import { container } from "tsyringe"

export const config = {
  api: { bodyParser: true },
}

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

    const response = await axios.request({
      method: "GET",
      url: req.body.url,
      responseType: "arraybuffer",
      headers: { "Content-Type": "image/png" },
    })

    console.log(response.data)

    const createFileService = container.resolve(CreateFileService)

    await createFileService.execute({
      file: response.data,
      shotId: new Id(shotId),
    })

    resp.status(200).end()
  } catch (error) {
    captureException(error)

    console.error(error)

    resp.status(500).end()
  }
}

export default withSentryForApi(screenshot, "screenshot")
