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
      const response = await axios.request({
        baseURL:
          "https://asia-northeast1-nni6wgvjdueqtcdmbcln.cloudfunctions.net/snapshot",
        url: `${props.hostname}/404/404`,
        method: "GET",
        responseType: "arraybuffer",
      })

      console.log(response.data)

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
