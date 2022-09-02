import z from 'zod'

export const getAllCommentsSchema = z.object({
  permalink: z.string(),
})

export type GetAllCommentsInput = z.TypeOf<typeof getAllCommentsSchema>

export const addCommentSchema = z.object({
  body: z.string(),
  permalink: z.string(),
  parentId: z.string().optional(),
})

export type AddCommentInput = z.TypeOf<typeof addCommentSchema>
