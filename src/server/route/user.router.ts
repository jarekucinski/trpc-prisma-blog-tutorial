import { createUserSchema } from '../../schema/user.schema'
import { createRouter } from '../createRouter'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as trcp from '@trpc/server'
export const userRouter = createRouter().mutation('register-user', {
  input: createUserSchema,
  async resolve({ ctx, input }) {
    const { email, name } = input

    try {
      const user = await ctx.prisma.user.create({
        data: {
          email,
          name,
        },
      })

      return user
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new trcp.TRPCError({ code: 'CONFLICT', message: 'User already exists' })
        }
      }

      throw new trcp.TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong' })
    }
  },
})
