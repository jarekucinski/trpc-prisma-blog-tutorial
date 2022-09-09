import { createPostSchema, getPostByPermalinkSchema, getSinglePostSchema } from '../../schema/post.schema'
import * as trpc from '@trpc/server'
import { createRouter } from '../createRouter'

const getPermaLink = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const postRouter = createRouter()
  .mutation('create-post', {
    input: createPostSchema,
    async resolve({ ctx, input }) {
      if (!ctx.user) {
        throw new trpc.TRPCError({ code: 'UNAUTHORIZED', message: 'Can not create a post while logged out' })
      }

      const { title } = input

      const permalink = `${getPermaLink(title)}`

      const post = await ctx.prisma.post.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx.user.id,
            },
          },
          permalink,
        },
      })

      return post
    },
  })
  .query('posts', {
    resolve({ ctx }) {
      return ctx.prisma.post.findMany()
    },
  })
  .query('single-post', {
    input: getSinglePostSchema,
    resolve({ ctx, input }) {
      return ctx.prisma.post.findUnique({ where: { id: input.postId } })
    },
  })
  .query('get-by-permalink', {
    input: getPostByPermalinkSchema,
    async resolve({ ctx, input }) {
      const { permalink } = input

      const post = await ctx.prisma.post.findUnique({
        where: {
          permalink,
        },
        select: {
          title: true,
          body: true,
          createdAt: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      })

      if (!post) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
        })
      }

      return post
    },
  })
