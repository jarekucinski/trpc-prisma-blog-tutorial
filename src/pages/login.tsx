import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { CreateUserInput } from '../schema/user.schema'
import { trpc } from '../utils/trpc'

const Register = () => {
  const { handleSubmit, register } = useForm<CreateUserInput>()
  const router = useRouter()

  // const { mutate, error } = trpc.useMutation(['users.register-user'], {
  //   onSuccess: () => {
  //     router.push('/login')
  //   },
  // })

  function onSubmit(values: CreateUserInput) {
    // mutate(values)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* {error && error.message} */}
        <h1>Login</h1>
        <input type={'email'} placeholder="john.doe@example.com" {...register('email')} />
        <br />
        <button type="submit">Login</button>
      </form>
      <Link href={'/register'}>Register</Link>
    </>
  )
}

export default Register
