import { URL } from "url"
import * as z from "zod"

const zValue = z.string().min(0).max(512)

export class ShortText {
  constructor(readonly value: z.infer<typeof zValue>) {
    zValue.parse(value)
  }

  get isEmpty() {
    return this.value.length === 0
  }

  get isURL() {
    if (this.isEmpty) {
      return false
    }

    try {
      const url = new URL(this.value)

      if (url.protocol !== "http:" && url.protocol !== "https:") {
        return false
      }

      if (!url.hostname.includes(".")) {
        return false
      }

      if (url.hostname.endsWith(".")) {
        return false
      }

      return true
    } catch (error) {
      return false
    }
  }
}
