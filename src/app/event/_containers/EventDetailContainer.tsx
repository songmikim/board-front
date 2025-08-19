'use client'

import React from 'react'

import type { EventType } from './EventListContainer'

type Props = {
  event: EventType
}

const EventDetailContainer = ({ event }: Props) => {
  return (
    <div>
      <h1>{event.title}</h1>
      {event.content && <p>{event.content}</p>}
    </div>
  )
}

export default React.memo(EventDetailContainer)