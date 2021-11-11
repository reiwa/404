import { BlitzApiHandler } from "blitz"
import { CreateFileService } from "integrations/application"
import { Id } from "integrations/domain"
import { container } from "tsyringe"

/**
 * https://github.com/vercel/vercel/issues/4739
 * @param req
 * @param resp
 */
const screenshot: BlitzApiHandler = async (req, resp) => {
  try {
    console.log("query", req.query)

    const routes = req.query.routes

    if (typeof routes === "string" || typeof routes === "undefined") {
      return
    }

    const [shotId] = routes

    if (typeof shotId === "undefined") {
      return
    }

    const file = req.body as Buffer

    const createFileService = container.resolve(CreateFileService)

    createFileService.execute({
      file,
      shotId: new Id(shotId),
    })

    resp.end(file)
  } catch (error) {
    console.error(error)

    resp.status(500).end()
  }
}

export default screenshot
