import { captureException } from "@sentry/node"
import db from "db"
import {
  Count,
  Id,
  ShortText,
  ShotEntity,
  UrlFactory,
} from "integrations/domain"

export class ShotRepository {
  async find(id: Id) {
    try {
      const prismaShot = await db.shot.findUnique({
        where: { id: id.value },
      })

      if (prismaShot === null) {
        return null
      }

      return new ShotEntity({
        id: new Id(prismaShot.id),
        title: new ShortText(prismaShot.title),
        hostname: new ShortText(prismaShot.hostname),
      })
    } catch (error) {
      captureException(error)

      if (error instanceof Error) {
        return new Error(error.message)
      }

      return new Error()
    }
  }

  async countByText(text: ShortText) {
    try {
      const hostname = text.isURL
        ? UrlFactory.fromText(text.value).hostname
        : text.value

      const prismaCount = await db.shot.count({
        where: {
          hostname: {
            contains: hostname,
          },
        },
      })

      return new Count(prismaCount)
    } catch (error) {
      captureException(error)

      if (error instanceof Error) {
        return new Error(error.message)
      }

      return new Error()
    }
  }

  async upsert(entity: ShotEntity) {
    try {
      await db.shot.upsert({
        create: {
          id: entity.id.value,
          title: entity.title.value,
          hostname: entity.hostname.value,
        },
        update: {
          title: entity.title.value,
        },
        where: {
          id: entity.id.value,
        },
      })
    } catch (error) {
      captureException(error)

      if (error instanceof Error) {
        return new Error(error.message)
      }

      return new Error()
    }
  }
}
