import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { withTRPC } from '@trpc/next'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import superjson from 'superjson'
import type { AppRouter } from '../server/route/app.router'
import { API_URL } from '../constants'
import { trpc } from '../utils/trpc'
import { UserContextProvider } from '../context/user.context'

function MyApp({ Component, pageProps }: AppProps) {
  const { data, isLoading } = trpc.useQuery(['users.me'])

  if (isLoading) {
    return <>Loading user...</>
  }

  return (
    <UserContextProvider value={data}>
      <Component {...pageProps} />
    </UserContextProvider>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url: API_URL,
      }),
    ]

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
      },
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            'x-ssr': 1,
          }
        }

        return {}
      },
      links,
      transformer: superjson,
    }
  },
  ssr: false,
})(MyApp)
