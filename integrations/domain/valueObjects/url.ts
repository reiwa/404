import * as z from "zod"

const zValue = z.string().url()

export class Url {
  constructor(public value: z.infer<typeof zValue>) {
    zValue.parse(value)
    Object.freeze(this)
  }

  get hostname() {
    const matchArray = this.value.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)

    if (matchArray === null) {
      throw new Error()
    }

    const [, hostname] = matchArray

    if (typeof hostname === "undefined") {
      throw new Error()
    }

    return hostname
  }
}
