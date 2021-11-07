import SuperJson from "superjson"

export class InternalError extends Error {
  readonly name = "InternalError"

  readonly code = "INTERNAL"

  constructor(message = "INTERNAL") {
    super()
    this.message = message
  }
}

SuperJson.registerClass(InternalError)

SuperJson.allowErrorProps("message")
