import Error from 'next/error'
import { useRouter } from 'next/router'
import React from 'react'
import { trpc } from '../../utils/trpc'

function SinglePostPage() {
  const router = useRouter()

  const permalink = router.query.permalink as string

  const { data, isLoading } = trpc.useQuery(['posts.get-post-by-permalink', { permalink }])

  if (isLoading) {
    return <p>Loading post...</p>
  }

  if (!data) {
    return <Error statusCode={404} />
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  )
}

export default SinglePostPage
