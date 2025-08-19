'use server'

import { fetchSSR } from '@/app/_global/libs/utils'

export async function getEvents() {
  try {
    const res = await fetchSSR('/api/v1/events')
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.error(err)
  }
  return []
}

export async function getEvent(seq: string) {
  try {
    const res = await fetchSSR(`/api/v1/events/${seq}`)
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.error(err)
  }
  return null
}