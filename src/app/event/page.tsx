import EventListContainer, { type EventType } from './_containers/EventListContainer'
import { getEvents } from './_services/actions'

export default async function EventPage() {

  const events: EventType[] = await getEvents()
  return <EventListContainer events={events} />
}