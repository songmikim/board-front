'use client'

import React, { useMemo, useState } from 'react'
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
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      event.title.toLowerCase().includes(query.toLowerCase())
    )
  }, [events, query])

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage)
  const paginatedEvents = useMemo(
    () =>
      filteredEvents.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
      ),
    [filteredEvents, page]
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setPage(1)
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="검색"
          value={query}
          onChange={handleSearch}
        />
      </div>
      <ul>
        {paginatedEvents.map((event) => (
          <li key={event.hash}>
            <Link href={`/event/${event.hash}`} target="_self">
              {event.title}
            </Link>
            <span> {event.date}</span>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <nav>
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, idx) => {
            const p = idx + 1
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                disabled={p === page}
              >
                {p}
              </button>
            )
          })}
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </nav>
      )}
    </>
  )
}

export default React.memo(EventListContainer)
