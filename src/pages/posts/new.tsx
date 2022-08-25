import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { CreatePostInput } from '../../schema/post.schema'
import { trpc } from '../../utils/trpc'

function CreatePostPage() {
  const { handleSubmit, register } = useForm<CreatePostInput>()
  const router = useRouter()

  const { mutate, error } = trpc.useMutation(['posts.create-post'], {
    onSuccess({ id }) {
      router.push(`/posts/${id}`)
    },
  })

  function onSubmit(values: CreatePostInput) {
    mutate(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && error.message}
      <h1>Add post</h1>
      <input type="text" {...register('title')} />
      <br />
      <textarea placeholder="Your post" {...register('body')} />
      <br />
      <button>Create post</button>
    </form>
  )
}

export default CreatePostPage
