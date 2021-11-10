import axios from "axios"
import { BlitzApiHandler } from "blitz"
import { Buffer } from "buffer"
import fs from "fs/promises"
import os from "os"
import sharp from "sharp"

/**
 * @param req
 * @param resp
 */
const images: BlitzApiHandler = async (req, resp) => {
  try {
    if (typeof req.query.url !== "string") {
      resp.writeHead(500, { "Content-Type": "image/jpeg" })
      resp.end()
      return
    }

    const url = !req.query.url.startsWith("http")
      ? `https://404.fish${req.query.url}`
      : req.query.url + ""

    const fileId = Buffer.from(req.query.url + "").toString("base64")

    const filePath = `${os.tmpdir()}/${fileId}`

    const cache = await readCache(filePath)

    if (cache !== null) {
      resp.writeHead(200, { "Content-Type": "image/png" })
      resp.end(cache)
      return
    }

    const width = typeof req.query.w === "string" ? parseInt(req.query.w) : 1080

    const quality = typeof req.query.q === "string" ? parseInt(req.query.q) : 75

    const response = await axios.request({
      url: url,
      method: "GET",
      responseType: "arraybuffer",
    })

    if (response.status !== 200) {
      resp.writeHead(500)
      resp.end()
      return
    }

    const data = response.data as Buffer

    if (data.byteLength === 0) {
      resp.writeHead(500)
      resp.end()
      return
    }

    const buffer = await sharp(response.data)
      .resize({ width })
      .png({ quality })
      .toBuffer()

    await writeCache(filePath, buffer)

    resp.writeHead(200, { "Content-Type": "image/png" })

    resp.end(buffer)
  } catch (error) {
    console.error(error)

    resp.writeHead(500)
    resp.end()
    return
  }
}

const readCache = async (path: string) => {
  try {
    return await fs.readFile(path)
  } catch (error) {
    return null
  }
}

const writeCache = async (path: string, buffer: Buffer) => {
  try {
    return await fs.writeFile(path, buffer)
  } catch (error) {
    return null
  }
}

export default images
