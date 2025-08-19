'use client'

import React from 'react'

export type EventType = {
  seq: number
  title: string
  content?: string
}

type Props = {
  events: EventType[]
}

const EventListContainer = ({ events }: Props) => {
  return (
    <ul>
      {events.map((event) => (
        <li key={event.seq}>{event.title}</li>
      ))}
    </ul>
  )
}

export default React.memo(EventListContainer)