import { Id, ShortText } from "integrations/domain/valueObjects"
import * as z from "zod"

const zProps = z.object({
  id: z.instanceof(Id),
  title: z.instanceof(ShortText),
  hostname: z.instanceof(ShortText),
})

export class ShotEntity {
  readonly id!: Id

  readonly title!: ShortText

  readonly hostname!: ShortText

  constructor(public props: z.infer<typeof zProps>) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }
}
