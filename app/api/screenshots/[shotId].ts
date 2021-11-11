import { captureException } from "@sentry/node"
import { withSentryForApi } from "app/core/utils/withSentryForApi"
import { BlitzApiHandler } from "blitz"
import formidable from "formidable"
import "reflect-metadata"

export const config = {
  api: { bodyParser: false },
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

    const incomingForm = formidable({})

    const files = await new Promise<formidable.Files>((resolve, reject) => {
      incomingForm.parse(req, (err, fields, files) => {
        if (err) {
          reject(err)
          return
        }

        console.log(fields)

        resolve(files)
      })
    })

    console.log("files")

    console.log(files)

    // const createFileService = container.resolve(CreateFileService)

    // await createFileService.execute({
    //   file,
    //   shotId: new Id(shotId),
    // })

    resp.status(200).end()
  } catch (error) {
    captureException(error)

    console.error(error)

    resp.status(500).end()
  }
}

export default withSentryForApi(screenshot, "screenshot")
