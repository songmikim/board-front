export type EventType = {
  hash: number
  link: string
  title: string
  content: string | null
  image?: string
  html: boolean
  date: string
}

export type PaginationType = {
  page: number
  lastPage: number
}

export type EventListData = {
  items: EventType[]
  pagination: PaginationType
}
