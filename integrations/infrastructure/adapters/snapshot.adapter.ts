import { captureException } from "@sentry/node"
import axios from "axios"
import fs from "fs/promises"
import { Id } from "integrations/domain"
import { tmpdir } from "os"
import { injectable } from "tsyringe"

@injectable()
export class SnapshotAdapter {
  async capture(props: { fileId: Id; hostname: string }) {
    try {
      const baseURL =
        process.env.NODE_ENV === "production"
          ? "https://404.fish/api"
          : "http://localhost:3000/api"

      const response = await axios.request({
        baseURL: baseURL,
        url: `${props.hostname}/404/404`,
        method: "GET",
        responseType: "arraybuffer",
      })

      const filePath = `${tmpdir()}/${props.fileId.value}.png`

      await fs.writeFile(filePath, response.data, "binary")

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
