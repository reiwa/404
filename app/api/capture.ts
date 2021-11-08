import { BlitzApiHandler } from "blitz"

export const config = {
  api: { bodyParser: false },
}

const capture: BlitzApiHandler = async (req, resp) => {
  resp.end()
}

export default capture
