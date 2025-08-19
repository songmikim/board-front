'use server'

import { fetchSSR } from '@/app/_global/libs/utils'

export async function getEvents() {
  try {
    const res = await fetchSSR('/event/environment')
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
    const res = await fetchSSR(`/event/environment/${seq}`)
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.error(err)
  }
  return null
}