import { withSentry } from "app/core/utils/withSentry"
import { zCreateShot } from "app/home/validations/createShot"
import { resolver } from "blitz"
import { CreateShotService } from "integrations/application"
import { UrlFactory } from "integrations/domain"
import { container } from "tsyringe"

const createShot = resolver.pipe(
  resolver.zod(zCreateShot),
  (props) => {
    return {
      url: UrlFactory.fromText(props.url),
    }
  },
  async (props) => {
    const createShotService = container.resolve(CreateShotService)

    const shot = await createShotService.execute({
      url: props.url,
    })

    if (shot instanceof Error) {
      throw shot
    }

    return { url: props.url.value }
  }
)

export default withSentry(createShot, "createShot")
