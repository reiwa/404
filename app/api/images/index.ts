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
    if (typeof req.url === "undefined") {
      resp.end()
      return
    }

    const paths = req.url.split("/")

    const fileId = paths[paths.length - 1] ?? ""

    const filePath = `${os.tmpdir()}/${Buffer.from(fileId).toString("base64")}`

    const cache = await readCache(filePath)

    if (cache !== null) {
      resp.writeHead(200, { "Content-Type": "image/jpeg" })
      resp.end(cache)
      return
    }

    const width = typeof req.query.w === "string" ? parseInt(req.query.w) : 1080

    const quality = typeof req.query.q === "string" ? parseInt(req.query.q) : 75

    const response = await axios.request({
      url: req.query.url + "",
      method: "GET",
      responseType: "arraybuffer",
    })

    const buffer = await sharp(response.data)
      .resize({ width })
      .jpeg({ quality })
      .toBuffer()

    await writeCache(filePath, buffer)

    resp.writeHead(200, { "Content-Type": "image/jpeg" })

    resp.end(buffer)
  } catch (error) {
    console.error(error)

    resp.end()
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
