import * as z from "zod"

const zValue = z.string().max(160)

export class Path {
  constructor(public value: z.infer<typeof zValue>) {
    zValue.parse(value)
    Object.freeze(this)
  }
}
