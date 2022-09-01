import z from 'zod'

export const getAllCommentsSchema = z.object({
  permalink: z.string(),
})

export type GetAllCommentsInput = z.TypeOf<typeof getAllCommentsSchema>
