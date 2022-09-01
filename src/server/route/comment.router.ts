import { TRPCError } from '@trpc/server'
import { getAllCommentsSchema } from '../../schema/comment.schema'
import { createRouter } from '../createRouter'

export const commentRouter = createRouter().query('all-comments', {
  input: getAllCommentsSchema,
  async resolve({ ctx, input }) {
    const { permalink } = input

    try {
      const comments = await ctx.prisma.comment.findMany({
        where: {
          Post: {
            permalink,
          },
        },
      })

      return comments
    } catch (error) {
      throw new TRPCError({ code: 'BAD_REQUEST' })
    }
  },
})
// .middleware(async ({ ctx, next }) => {
//   if (!ctx.user) {
//     throw new TRPCError({ code: 'UNAUTHORIZED' })
//   }

//   return next()
// })
