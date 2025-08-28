'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { format } from 'date-fns'
import LayerPopup from '../_global/components/LayerPopup'
import type { BoardDataType } from '@/app/board/_types/BoardType'

const List = styled.ul`
  margin-top: 20px;
  li + li {
    margin-top: 10px;
  }
  li {
    display: flex;
    justify-content: space-between;
  }
  a {
    text-decoration: none;
    color: #333;
  }
  time {
    color: #666;
    font-size: 0.875rem;
  }
`

type Props = {
  items?: Array<BoardDataType>
}

const NoticeModal = ({ items }: Props) => {
  const [open, setOpen] = useState(true)

  return (
    <LayerPopup isOpen={open} onClose={() => setOpen(false)} width={500}>
      <Image src="/globe.svg" alt="guide" width={480} height={240} />
      <List>
        {items && items.length > 0 ? (
          items.map((item) => (
            <li key={item.seq}>
              <a href={`/board/view/${item.seq}`}>{item.subject}</a>
              {item.createdAt && (
                <time dateTime={item.createdAt.toISOString()}>
                  {format(item.createdAt, 'yyyy.MM.dd')}
                </time>
              )}
            </li>
          ))
        ) : (
          <li>공지글이 없습니다.</li>
        )}
      </List>
    </LayerPopup>
  )
}

export default React.memo(NoticeModal)