"use client"

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import type { EventType } from '../_types'

type Props = {
  event: EventType
}

const Article = styled.article`
  line-height: 1.6;

  h1 {
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: 700;
  }

  time {
    display: block;
    margin-bottom: 20px;
    color: #666;
  }

  p {
    margin-top: 20px;
  }

  img {
    max-width: 100%;
    display: block;
    margin-top: 20px;
  }
`

const EventDetail = ({ event }: Props) => {
  const imageSrc = event.image
    ? event.image.startsWith('http')
      ? event.image
      : new URL(event.image, event.link).href
    : null

  return (
    <Article>
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      {imageSrc && (
        <p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageSrc} alt={event.title} />
        </p>
      )}
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
    </Article>
  )
}

export default React.memo(EventDetail)
