import SuperJson from "superjson"

export class AlreadyExistsError extends Error {
  readonly name = "AlreadyExistsError"

  readonly code = "ALREADY_EXISTS"

  constructor(message = "ALREADY_EXISTS") {
    super()
    this.message = message
  }
}

SuperJson.registerClass(AlreadyExistsError)

SuperJson.allowErrorProps("message")
