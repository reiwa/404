import chrome from "chrome-aws-lambda"
import type express from "express"
import { https, region } from "firebase-functions"
import fs from "fs/promises"
import { nanoid } from "nanoid"
import { tmpdir } from "os"
import puppeteer from "puppeteer-core"

let page: puppeteer.Page | null = null

/**
 * https://github.com/vercel/vercel/issues/4739
 * @param req
 * @param resp
 */
const handler = async (req: https.Request, resp: express.Response) => {
  try {
    const path = req.params["0"]

    if (page === null) {
      const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
        defaultViewport: {
          width: 1024,
          height: 1024,
        },
      })

      page = await browser.newPage()
    }

    const url = `https://${path}`

    await page.goto(url, { waitUntil: "networkidle0" })

    const filePath = `${tmpdir()}/${nanoid()}.png`

    await page.screenshot({ path: filePath })

    const file = await fs.readFile(filePath)

    resp.writeHead(200, { "Content-Type": "image/jpeg" })

    resp.end(file)
  } catch (error) {
    console.error(error)

    resp.end()
  }
}

export const snapshot = region("asia-northeast1")
  .runWith({ memory: "2GB", timeoutSeconds: 540 })
  .https.onRequest(handler)
