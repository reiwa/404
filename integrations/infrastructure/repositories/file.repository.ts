import { captureException } from "@sentry/node"
import db from "db"
import { FileEntity, Id, Url } from "integrations/domain"

export class FileRepository {
  async findManyByShotId(id: Id) {
    try {
      const prismaFiles = await db.file.findMany({
        where: {
          shotId: id.value,
        },
      })

      if (prismaFiles === null) {
        return null
      }

      return prismaFiles.map((prismaFile) => {
        return new FileEntity({
          id: new Id(prismaFile.id),
          width: prismaFile.width,
          height: prismaFile.height,
          bucketId: new Id(prismaFile.id),
          url: new Url(prismaFile.url),
          shotId: new Id(prismaFile.shotId),
        })
      })
    } catch (error) {
      captureException(error)

      if (error instanceof Error) {
        return new Error(error.message)
      }

      return new Error()
    }
  }

  async upsert(entity: FileEntity) {
    try {
      await db.file.upsert({
        create: {
          id: entity.id.value,
          width: entity.width,
          height: entity.height,
          url: entity.url.value,
          bucketId: entity.bucketId.value,
          shot: {
            connect: { id: entity.shotId.value },
          },
        },
        update: {},
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
