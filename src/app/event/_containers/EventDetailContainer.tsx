'use client'

import React from 'react'

import type { EventType } from './EventListContainer'

type Props = {
  event: EventType
}

const EventDetailContainer = ({ event }: Props) => {
  return (
    <article>
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      {event.content && <p>{event.content}</p>}
      <a href={event.link} target="_blank" rel="noopener noreferrer">
        원문 보기
      </a>
    </article>
  )
}

export default React.memo(EventDetailContainer)
