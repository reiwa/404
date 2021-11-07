import { Id, Url } from "integrations/domain/valueObjects"
import * as z from "zod"

const zProps = z.object({
  id: z.instanceof(Id),
  width: z.number().positive(),
  height: z.number().positive(),
  bucketId: z.instanceof(Id),
  url: z.instanceof(Url),
  shotId: z.instanceof(Id),
})

export class FileEntity {
  readonly id!: Id

  readonly width!: number

  readonly height!: number

  readonly bucketId!: Id

  readonly url!: Url

  readonly shotId!: Id

  constructor(public props: z.infer<typeof zProps>) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }

  withURL(url: Url) {
    return new FileEntity({ ...this.props, url })
  }
}
