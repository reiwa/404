import { captureException } from "@sentry/node"
import axios from "axios"
import { Id, Url } from "integrations/domain"
import { injectable } from "tsyringe"

@injectable()
export class FunctionAdapter {
  async createFile(props: { url: Url; shotId: Id }) {
    try {
      const baseURL = "https://404.fish/api"

      axios.request({
        baseURL,
        url: "createFile",
        method: "POST",
        data: {
          url: props.url,
          shotId: props.shotId,
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
