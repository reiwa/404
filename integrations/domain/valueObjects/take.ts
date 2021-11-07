import * as z from "zod"

const zValue = z.number().min(0).max(20)

export class Take {
  constructor(public value: z.infer<typeof zValue> = 8) {
    zValue.parse(value)
    Object.freeze(this)
  }
}
