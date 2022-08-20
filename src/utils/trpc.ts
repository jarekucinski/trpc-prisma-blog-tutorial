import { createReactQueryHooks } from '@trpc/react'
import type { AppRouter } from '../server/route/app.router'

export const trpc = createReactQueryHooks<AppRouter>()
