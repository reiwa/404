import * as z from "zod"

const zValue = z.number().nonnegative()

export class Count {
  constructor(public value: z.infer<typeof zValue> = 0) {
    zValue.parse(value)
    Object.freeze(this)
  }
}
