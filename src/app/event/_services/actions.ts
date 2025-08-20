'use server'

import { fetchSSR } from '@/app/_global/libs/utils'
import type { EventType } from '../_containers/EventListContainer'

export async function getEvents(): Promise<EventType[]> {
  try {
    const res = await fetchSSR('/api/v1/events')
    if (res.ok) {
      const data = await res.json()
      return data.items ?? []
    }
  } catch (err) {
    console.error(err)
  }
  return []
}

export async function getEvent(hash: string): Promise<EventType | null> {
  try {
    const res = await fetchSSR(`/api/v1/events/${hash}`)
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.error(err)
  }
  return null
}