import {
  configureScope,
  init,
  Integrations,
  setContext,
  startTransaction,
} from "@sentry/node"
import "@sentry/tracing"
import { Ctx } from "blitz"
import { InternalError } from "integrations/errors"
import "reflect-metadata"
import packageJSON from "../../../package.json"

export const withSentry = <T, U>(
  resolver: (t: T, ctx: Ctx) => PromiseLike<U>,
  name: string
) => {
  if (process.env.NODE_ENV === "production") {
    init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
      attachStacktrace: true,
      normalizeDepth: 5,
      environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
      integrations: [new Integrations.Http({ tracing: true })],
      release: `404@${packageJSON.version}`,
    })
  }

  return async (input: T, ctx: Ctx) => {
    try {
      // setUser({ user: { id: ctx.session?.userId } })

      setContext("input", input)

      const transaction = startTransaction({ op: "function", name })

      configureScope((scope) => {
        scope.setSpan(transaction)
      })

      const result = await resolver(input, ctx)

      transaction.finish()

      return result
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }

      throw new InternalError()
    }
  }
}
