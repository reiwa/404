import { captureException } from "@sentry/node"
import chrome from "chrome-aws-lambda"
import { Id, Url } from "integrations/domain"
import { tmpdir } from "os"
import puppeteer from "puppeteer-core"
import { injectable } from "tsyringe"

@injectable()
export class SnapshotAdapter {
  async capture(props: { fileId: Id; url: Url }) {
    try {
      const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
        defaultViewport: {
          width: 1024,
          height: 1024,
        },
      })

      const page = await browser.newPage()

      const url = `${props.url.value}/404/404`

      await page.goto(url, { waitUntil: "networkidle0" })

      const filePath = `${tmpdir()}/${props.fileId.value}.png`

      await page.screenshot({ path: filePath })

      await browser.close()

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
