"use client"

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import type { EventType } from '../_types'

type Props = {
  query: string
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  events: EventType[]
  page: number
  totalPages: number
  onPageChange: (p: number) => void
}

const Wrapper = styled.div`
  width: 100%;
`

const SearchBox = styled.div`
  margin-bottom: 20px;

  input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const Item = styled.li`
  & + & {
    margin-top: 10px;
  }

  span {
    margin-left: 10px;
    color: #666;
  }
`

const Pagination = styled.nav`
  margin-top: 20px;

  button {
    margin-right: 5px;
  }
`

const EventList = ({ query, onSearch, events, page, totalPages, onPageChange }: Props) => {
  return (
    <Wrapper>
      <SearchBox>
        <input
          type="text"
          placeholder="검색"
          value={query}
          onChange={onSearch}
        />
      </SearchBox>
      <List>
        {events.map((event) => (
          <Item key={event.hash}>
            <Link href={`/event/${event.hash}`} target="_self">
              {event.title}
            </Link>
            <span>{event.date}</span>
          </Item>
        ))}
      </List>
      {totalPages > 1 && (
        <Pagination>
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
        </Pagination>
      )}
    </Wrapper>
  )
}

export default React.memo(EventList)
