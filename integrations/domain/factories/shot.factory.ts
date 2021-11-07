import { ShotEntity } from "integrations/domain/entities"
import { IdFactory } from "integrations/domain/factories/id.factory"
import { ShortText } from "integrations/domain/valueObjects"

export class ShotFactory {
  static create(props: { title: ShortText; hostname: ShortText }) {
    return new ShotEntity({
      id: IdFactory.create(),
      title: props.title,
      hostname: props.hostname,
    })
  }
}
