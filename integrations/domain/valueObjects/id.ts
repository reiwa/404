import * as z from "zod"

const zValue = z.string().max(40)

export class Id {
  constructor(public value: z.infer<typeof zValue>) {
    zValue.parse(value)
    Object.freeze(this)
  }
}
