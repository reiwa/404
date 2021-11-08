import { captureException } from "@sentry/node"
import {
  FileFactory,
  Id,
  IdFactory,
  ShortText,
  ShotFactory,
  Url,
} from "integrations/domain"
import { InternalError } from "integrations/errors"
import {
  FileRepository,
  ShotRepository,
  SnapshotAdapter,
  StorageAdapter,
} from "integrations/infrastructure"
import { injectable } from "tsyringe"

type Props = {
  url: Url
}

@injectable()
export class CreateShotService {
  constructor(
    private readonly storageAdapter: StorageAdapter,
    private readonly snapshotAdapter: SnapshotAdapter,
    private readonly shotRepository: ShotRepository,
    private readonly fileRepository: FileRepository
  ) {}

  async execute(props: Props) {
    try {
      const shot = ShotFactory.create({
        title: new ShortText("title"),
        hostname: new ShortText(props.url.hostname),
      })

      const fileId = IdFactory.create()

      const capture = await this.snapshotAdapter.capture({
        fileId,
        hostname: props.url.hostname,
      })

      if (capture instanceof Error) {
        return new InternalError(capture.message)
      }

      const bucketId = new Id("default")

      const upload = await this.storageAdapter.upload({
        fileId,
        bucketId,
      })

      if (upload instanceof Error) {
        return new InternalError(upload.message)
      }

      const file = FileFactory.createSnapshot({
        id: fileId,
        url: upload.url,
        bucketId,
        shotId: shot.id,
      })

      const upsertShot = await this.shotRepository.upsert(shot)

      if (upsertShot instanceof Error) {
        return new InternalError(upsertShot.message)
      }

      const fileWithURL = file.withURL(upload.url)

      const upsertFile = await this.fileRepository.upsert(fileWithURL)

      if (upsertFile instanceof Error) {
        return new InternalError(upsertFile.message)
      }

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
