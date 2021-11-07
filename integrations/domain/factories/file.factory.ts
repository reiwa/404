import { FileEntity } from "integrations/domain/entities"
import { Id, Url } from "integrations/domain/valueObjects"

export class FileFactory {
  static createSnapshot(props: { id: Id; url: Url; bucketId: Id; shotId: Id }) {
    return new FileEntity({
      id: props.id,
      width: 1024,
      height: 1024,
      bucketId: props.bucketId,
      url: props.url,
      shotId: props.shotId,
    })
  }
}
