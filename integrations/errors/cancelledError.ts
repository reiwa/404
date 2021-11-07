import SuperJson from "superjson"

export class CancelledError extends Error {
  readonly name = "CancelledError"

  readonly code = "CANCELLED"

  constructor(message = "CANCELLED") {
    super()
    this.message = message
  }
}

SuperJson.registerClass(CancelledError)

SuperJson.allowErrorProps("message")
