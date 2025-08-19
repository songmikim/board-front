import EventDetailContainer from '../_containers/EventDetailContainer'

const getEvent = async (seq: string) => {
  return { seq: Number(seq), title: '', content: '' }
}

export default async function EventDetailPage({ params }: { params: { seq: string } }) {
  const event = await getEvent(params.seq)
  return <EventDetailContainer event={event} />
}