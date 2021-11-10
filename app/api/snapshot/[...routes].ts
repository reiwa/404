import { BlitzApiHandler } from "blitz"
import fs from "fs/promises"
import { nanoid } from "nanoid"
import { tmpdir } from "os"
import puppeteer from "puppeteer"

let page: puppeteer.Page | null = null

/**
 * https://github.com/vercel/vercel/issues/4739
 * @param req
 * @param resp
 */
const screenshot: BlitzApiHandler = async (req, resp) => {
  try {
    const routes = req.query.routes

    if (typeof routes === "string" || typeof routes === "undefined") {
      return
    }

    const path = routes.join("/")

    if (page === null) {
      const browser = await puppeteer.launch({
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

    if (file.byteLength === 0) {
      resp.status(500).end()
      return
    }

    resp.writeHead(200, { "Content-Type": "image/jpeg" })

    resp.end(file)
  } catch (error) {
    console.error(error)

    resp.status(500).end()
  }
}

export default screenshot
