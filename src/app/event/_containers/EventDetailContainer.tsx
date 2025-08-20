'use client'

import React from 'react'
import Link from 'next/link'

import type { EventType } from './EventListContainer'

type Props = {
  event: EventType
}

const EventDetailContainer = ({ event }: Props) => {
  return (
    <article>
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      {event.content &&
        (event.html ? (
          <div dangerouslySetInnerHTML={{ __html: event.content }} />
        ) : (
          <p>{event.content}</p>
        ))}
      <p>
        <a href={event.link} target="_blank" rel="noopener noreferrer">
          원문 바로가기
        </a>
      </p>
      <p>
        <Link href="/event" target="_self">
          목록으로
        </Link>
      </p>
    </article>
  )
}

export default React.memo(EventDetailContainer)
