import * as z from "zod"

const zValue = z.number().min(0)

export class Skip {
  constructor(public value: z.infer<typeof zValue>) {
    zValue.parse(value)
    Object.freeze(this)
  }
}
