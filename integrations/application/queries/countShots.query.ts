import { captureException } from "@sentry/node"
import { ShortText } from "integrations/domain"
import { InternalError } from "integrations/errors"
import { ShotRepository } from "integrations/infrastructure"
import { injectable } from "tsyringe"

type Props = {
  text: ShortText
}

@injectable()
export class CountShotsQuery {
  constructor(private readonly shotRepository: ShotRepository) {}

  async execute(props: Props) {
    try {
      const count = await this.shotRepository.countByText(props.text)

      if (count instanceof Error) {
        return count
      }

      return count
    } catch (error) {
      captureException(error)

      if (error instanceof Error) {
        return new InternalError(error.message)
      }

      return new InternalError()
    }
  }
}
