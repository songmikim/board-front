'use server'

import { fetchSSR } from '@/app/_global/libs/utils'
import type { CrawlerConfigType } from '../_types'

export async function getCrawlerConfigs(): Promise<CrawlerConfigType[]> {
  try {
    const res = await fetchSSR('/crawler/configs')
    if (res.ok) {
      const data = await res.json()
      const list = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : []
      return list.map((cfg: any) => ({
        url: cfg.url ?? '',
        keywords: Array.isArray(cfg.keywords)
          ? cfg.keywords.join('\n')
          : cfg.keywords ?? '',
        linkSelector: cfg.linkSelector ?? '',
        titleSelector: cfg.titleSelector ?? '',
        dateSelector: cfg.dateSelector ?? '',
        contentSelector: cfg.contentSelector ?? '',
        urlPrefix: cfg.urlPrefix ?? '',
      }))
    }
  } catch (err) {
    console.error(err)
  }
  return []
}

export async function getCrawlerScheduler(): Promise<boolean> {
  try {
    const res = await fetchSSR('/crawler/scheduler')
    if (res.ok) {
      const data = await res.json()
      return data.enabled ?? false
    }
  } catch (err) {
    console.error(err)
  }
  return false
}

export async function saveCrawlerConfigs(configs: CrawlerConfigType[]) {
  await fetchSSR('/crawler/configs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(configs),
  })
}

export async function setCrawlerScheduler(enabled: boolean) {
  await fetchSSR(`/crawler/scheduler?enabled=${enabled}`, { method: 'POST' })
}
