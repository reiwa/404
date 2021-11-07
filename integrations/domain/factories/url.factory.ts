import { Url } from "integrations/domain"
import { URL } from "url"

export class UrlFactory {
  static fromText(text: string) {
    const url = new URL(text)

    return new Url(url.origin)
  }
}
