import {
  configureScope,
  init,
  Integrations,
  setContext,
  startTransaction,
} from "@sentry/node"
import "@sentry/tracing"
import { BlitzApiHandler } from "blitz"
import "reflect-metadata"
import packageJSON from "../../../package.json"

export const withSentryForApiHandler = (
  handler: BlitzApiHandler,
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

  const internalHandler: BlitzApiHandler = async (req, resp) => {
    setContext("req.query", req.query)

    setContext("req.body", req.body)

    const transaction = startTransaction({ op: "function", name })

    configureScope((scope) => {
      scope.setSpan(transaction)
    })

    const result = await handler(req, resp)

    transaction.finish()

    return result
  }

  return internalHandler
}
