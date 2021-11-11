import { captureException } from "@sentry/node"
import axios from "axios"
import { Id, Url } from "integrations/domain"
import { injectable } from "tsyringe"

@injectable()
export class FunctionAdapter {
  async screenshot(props: { url: Url; shotId: Id }) {
    try {
      const baseURL =
        "https://asia-northeast1-c2syk4blrzpbw4nptck4.cloudfunctions.net"

      axios.request({
        baseURL,
        url: `screenshot/${props.url.hostname}`,
        method: "POST",
        data: {
          width: 1024,
          height: 1024,
          callbackURL: `https://404.fish/api/screenshots/${props.shotId.value}`,
        },
      })

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null)
        }, 1000)
      })

      return null
    } catch (error) {
      captureException(error)

      if (error instanceof Error) {
        return new Error(error.message)
      }

      return new Error()
    }
  }
}
