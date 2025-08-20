'use client'

import React from 'react'
import Link from 'next/link'

export type EventType = {
  hash: number
  link: string
  title: string
  content: string | null
  image?: string
  html: boolean
  date: string
}

type Props = {
  events: EventType[]
}

const EventListContainer = ({ events }: Props) => {
  return (
    <ul>
      {events.map((event) => (
        <li key={event.hash}>
          <a href={event.link} target="_blank" rel="noopener noreferrer">
            {event.title}
          </a>
          <span> {event.date}</span>
        </li>
      ))}
    </ul>
  )
}

export default React.memo(EventListContainer)