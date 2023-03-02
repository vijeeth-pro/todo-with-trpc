import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { trpc } from '@/utlis/trpc'
import { useEffect, useState } from 'react'

export default function Home() {

  const utlis = trpc.useContext()

  const { data } = trpc.getHello.useQuery()
  const mutation = trpc.hello.useMutation({
    onSuccess() {
      utlis.getHello.invalidate()
    }
  })

  const deleteApi = trpc.deleteHello.useMutation({
    onSuccess(input) {
      utlis.getHello.invalidate()
    }
  })

  const [payload, setpayload] = useState({
    text: ''
  })

  const submit = () => {
    mutation.mutate(payload)
  }

  const del = (id: number) => {
    deleteApi.mutate({ id })
  }


  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <input type="text" name="text" id="" onChange={(e) => setpayload({ text: e.target.value })} />
        <button type="submit" onClick={() => submit()}>submit</button>
        <p style={{ display: 'flex', flexDirection: 'column' }}>
          {data?.map((val, i) => {
            return (

              <a onClick={() => del(val.id)} key={val.id}>{val.text}</a>
            )
          })}
        </p>
      </main>
    </>
  )
}