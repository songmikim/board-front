import EventDetailContainer from '../_containers/EventDetailContainer'
import { getEvent } from '../_services/actions'
import type { EventType } from '../_containers/EventListContainer'

export default async function EventDetailPage({ params }: { params: { seq: string } }) {

  const event: EventType | null = await getEvent(params.seq)
  if (!event) {
    return null
  }
  return <EventDetailContainer event={event} />
}