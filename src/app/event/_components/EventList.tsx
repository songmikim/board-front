"use client"

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Pagination from '@/app/_global/components/Pagination'
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
      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </Wrapper>
  )
}

export default React.memo(EventList)

