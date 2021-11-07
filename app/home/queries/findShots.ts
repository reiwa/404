import { withSentry } from "app/core/utils/withSentry"
import { zFindShots } from "app/home/validations/findShots"
import { paginate, resolver } from "blitz"
import { CountShotsQuery, FindShotsQuery } from "integrations/application"
import { ShortText, Skip, Take } from "integrations/domain"
import { container } from "tsyringe"

const findShots = resolver.pipe(
  resolver.zod(zFindShots),
  (props) => {
    return {
      text: new ShortText(props.text),
      skip: new Skip(props.skip),
      take: new Take(16),
    }
  },
  async (props) => {
    const countShotsQuery = container.resolve(CountShotsQuery)

    const findShotsQuery = container.resolve(FindShotsQuery)

    const count = await countShotsQuery.execute({ text: props.text })

    if (count instanceof Error) {
      throw count
    }

    const shots = await findShotsQuery.execute({
      take: props.take,
      text: props.text,
      skip: props.skip,
    })

    if (shots instanceof Error) {
      throw shots
    }

    return paginate({
      skip: props.skip.value,
      take: props.take.value,
      async count() {
        return count.value
      },
      async query() {
        return shots
      },
    })
  }
)

export default withSentry(findShots, "findShots")
