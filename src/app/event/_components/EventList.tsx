import React from 'react'
import Link from 'next/link'
import type { EventType } from '../_types'

type Props = {
  query: string
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  events: EventType[]
  page: number
  totalPages: number
  onPageChange: (p: number) => void
}

const EventList = ({ query, onSearch, events, page, totalPages, onPageChange }: Props) => {
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="검색"
          value={query}
          onChange={onSearch}
        />
      </div>
      <ul>
        {events.map((event) => (
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
            onClick={() => onPageChange(Math.max(page - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, idx) => {
            const p = idx + 1
            return (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                disabled={p === page}
              >
                {p}
              </button>
            )
          })}
          <button
            onClick={() => onPageChange(Math.min(page + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </nav>
      )}
    </>
  )
}

export default React.memo(EventList)
