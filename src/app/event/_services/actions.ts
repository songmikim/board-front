'use server'

import { fetchSSR } from '@/app/_global/libs/utils'
import type { EventType, EventListData } from '../_types'

export async function getEvents(page: number = 1): Promise<EventListData> {
  try {
    const res = await fetchSSR(`/events?page=${page}`)
    if (res.ok) {
      const data = await res.json()
      return {
        items: data.items ?? [],
        pagination: data.pagination ?? { page, lastPage: page },
      }
    }
  } catch (err) {
    console.error(err)
  }
  return { items: [], pagination: { page, lastPage: page } }
}

export async function getEvent(hash: string): Promise<EventType | null> {
  try {
    const res = await fetchSSR(`/events/${hash}`)
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.error(err)
  }
  return null
}
