import Error from 'next/error'
import { useRouter } from 'next/router'
import React from 'react'
import { trpc } from '../../utils/trpc'

function SinglePostPage() {
  const router = useRouter()

  const permalink = router.query.permalink as string

  const { data, isLoading } = trpc.useQuery(['posts.get-by-permalink', { permalink }])

  if (isLoading) {
    return <p>Loading post...</p>
  }

  if (!data) {
    return <Error statusCode={404} />
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data?.body || '' }} />
    </div>
  )
}

export default SinglePostPage
