import EventListContainer from './_containers/EventListContainer'
import { getEvents } from './_services/actions'
import type { EventListData } from './_types'

type PageProps = {
  searchParams: { page?: string }
}

export default async function EventPage({ searchParams }: PageProps) {
  const page = Number(searchParams.page) || 1
  const { items, pagination }: EventListData = await getEvents(page)
  return <EventListContainer events={items} pagination={pagination} />
}
