import { captureException } from "@sentry/node"
import type { BlitzApiHandler } from "blitz"
import chrome from "chrome-aws-lambda"
import fs from "fs/promises"
import { nanoid } from "nanoid"
import { tmpdir } from "os"
import puppeteer from "puppeteer-core"

export const config = {
  api: { bodyParser: false },
}

/**
 * https://github.com/vercel/vercel/issues/4739
 * @param req
 * @param resp
 */
const snapshot: BlitzApiHandler = async (req, resp) => {
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

    const url = `${req.query.url}/404/404`

    await page.goto(url, { waitUntil: "networkidle0" })

    const filePath = `${tmpdir()}/${nanoid()}.png`

    await page.screenshot({ path: filePath })

    await browser.close()

    const file = await fs.readFile(filePath)

    resp.writeHead(200, { "Content-Type": "image/jpeg" })

    resp.end(file)
  } catch (error) {
    captureException(error)

    resp.end()
  }
}

export default snapshot
