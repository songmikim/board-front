'use client'
import { useEffect } from 'react'
import useFetch from './_global/hooks/useFetch'
export default function MainPage() {
  const data = useFetch('http://localhost:4000/api/vi/member')
  console.log(data)
  return <></>
}
