import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { AddCommentInput } from '../../schema/comment.schema'
import { trpc } from '../../utils/trpc'

type Props = {
  parentId?: string
}

const CommentForm = ({ parentId }: Props) => {
  const router = useRouter()
  const permalink = router.query.permalink as string
  const { handleSubmit, register } = useForm<AddCommentInput>({
    defaultValues: {
      body: '',
    },
  })
  const { mutate, error } = trpc.useMutation(['comments.add-comment'])

  function onSubmit(values: AddCommentInput) {
    mutate({ ...values, permalink, parentId })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        <textarea placeholder="Your comment" {...register('body')} />
        <br />
        <button>Add comment</button>
      </form>
    </div>
  )
}

export default CommentForm
