import EventListContainer from './_containers/EventListContainer'

const getEvents = async () => {
  return []
}

export default async function EventPage() {
  const events = await getEvents()
  return <EventListContainer events={events} />
}
