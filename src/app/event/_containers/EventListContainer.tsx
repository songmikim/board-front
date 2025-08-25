'use client'

import React, { useMemo, useState } from 'react'
import EventList from '../_components/EventList'
import type { EventType } from '../_types'

type Props = {
  events: EventType[]
}

const EventListContainer = ({ events }: Props) => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const itemsPerPage = 4

  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      event.title.toLowerCase().includes(query.toLowerCase()),
    )
  }, [events, query])

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage)
  const paginatedEvents = useMemo(
    () => filteredEvents.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [filteredEvents, page],
  )

  const createPagination = (
    current: number,
    last: number,
    range = 10,
  ) => {
    const start = Math.floor((current - 1) / range) * range + 1
    const end = Math.min(start + range - 1, last)
    const pages = [] as Array<[string, string]>
    for (let i = start; i <= end; i++) {
      pages.push([i.toString(), '#'])
    }
    return {
      pages,
      page: current,
      prevRangePage: start > 1 ? start - 1 : 0,
      nextRangePage: end < last ? end + 1 : 0,
      lastPage: last,
      baseUrl: '#',
    }
  }

  const pagination = useMemo(
    () => createPagination(page, totalPages),
    [page, totalPages],
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setPage(1)
  }

  const handlePageChange = (p: number) => {
    setPage(p)
  }

  return (
    <EventList
      query={query}
      onSearch={handleSearch}
      events={paginatedEvents}
      pagination={pagination}
      onPageChange={handlePageChange}
    />
  )
}

export default React.memo(EventListContainer)
