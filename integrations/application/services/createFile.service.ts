import { captureException } from "@sentry/node"
import { FileFactory, Id, IdFactory } from "integrations/domain"
import { InternalError } from "integrations/errors"
import { FileRepository, StorageAdapter } from "integrations/infrastructure"
import { injectable } from "tsyringe"

type Props = {
  file: Buffer
  shotId: Id
}

@injectable()
export class CreateFileService {
  constructor(
    private readonly storageAdapter: StorageAdapter,
    private readonly fileRepository: FileRepository
  ) {}

  async execute(props: Props) {
    try {
      const fileId = IdFactory.create()

      const bucketId = new Id("default")

      const upload = await this.storageAdapter.upload({
        fileId,
        bucketId,
        file: props.file,
      })

      if (upload instanceof Error) {
        return new InternalError(upload.message)
      }

      const file = FileFactory.createSnapshot({
        id: fileId,
        url: upload.url,
        bucketId,
        shotId: props.shotId,
      })

      const upsertFile = await this.fileRepository.upsert(file)

      if (upsertFile instanceof Error) {
        return new InternalError(upsertFile.message)
      }

      return file
    } catch (error) {
      captureException(error)

      if (error instanceof Error) {
        return new InternalError(error.message)
      }

      return new InternalError()
    }
  }
}
