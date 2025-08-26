import { getEvents } from './_services/actions'
import { MainTitle } from '../_global/components/TitleBox'
import EventListContainer from './_containers/EventListContainer'

export default async function EventPage({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string }
}) {
  const page = Number(searchParams?.page) || 1
  const limit = Number(searchParams?.limit) || 5
  const { items: events, pagination } = await getEvents(page, limit)
  return (
    <div className="layout-width">
      <MainTitle border="true">환경 행사</MainTitle>
      <EventListContainer
        events={events}
        pagination={pagination}
        limit={limit}
      />
    </div>
  )
}
