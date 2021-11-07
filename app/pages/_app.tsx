import { ChakraProvider } from "@chakra-ui/react"
import { ErrorBoundary as SentryErrorBoundary } from "@sentry/react"
import { BoxPageErrorFallback } from "app/core/components/BoxPageErrorFallback"
import { theme } from "app/core/theme/theme"
import { AppProps, ErrorBoundary, useQueryErrorResetBoundary } from "blitz"
import "integrations/errors"
import React, { FunctionComponent } from "react"

const App: FunctionComponent<AppProps> = ({ Component, ...props }) => {
  const getLayout = Component.getLayout || ((page) => page)

  const queryErrorResetBoundary = useQueryErrorResetBoundary()

  return (
    <SentryErrorBoundary>
      <ErrorBoundary
        FallbackComponent={BoxPageErrorFallback}
        onReset={queryErrorResetBoundary.reset}
      >
        <ChakraProvider theme={theme}>
          {getLayout(<Component {...props.pageProps} />)}
        </ChakraProvider>
      </ErrorBoundary>
    </SentryErrorBoundary>
  )
}

export default App
