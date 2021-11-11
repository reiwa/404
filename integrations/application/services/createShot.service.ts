import { captureException } from "@sentry/node"
import { ShortText, ShotFactory, Url } from "integrations/domain"
import { InternalError } from "integrations/errors"
import { FunctionAdapter, ShotRepository } from "integrations/infrastructure"
import { injectable } from "tsyringe"

type Props = {
  url: Url
}

@injectable()
export class CreateShotService {
  constructor(
    private readonly functionAdapter: FunctionAdapter,
    private readonly shotRepository: ShotRepository
  ) {}

  async execute(props: Props) {
    try {
      const shot = ShotFactory.create({
        title: new ShortText("title"),
        hostname: new ShortText(props.url.hostname),
      })

      const upsertShot = await this.shotRepository.upsert(shot)

      if (upsertShot instanceof Error) {
        return new InternalError(upsertShot.message)
      }

      await this.functionAdapter.screenshot({ url: props.url, shotId: shot.id })

      return shot
    } catch (error) {
      captureException(error)

      if (error instanceof Error) {
        return new InternalError(error.message)
      }

      return new InternalError()
    }
  }
}
