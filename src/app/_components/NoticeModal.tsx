'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import LayerPopup from '../_global/components/LayerPopup'
import type { BoardDataType } from '@/app/board/_types/BoardType'

const List = styled.ul`
  margin-top: 20px;

  li {
    border-bottom: 1px solid #ccc;
    margin-top: 10px;
  }
  a {
    text-decoration: none;
    color: #333;
  }
`

type Props = {
  items?: Array<BoardDataType>
}

const NoticeModal = ({ items }: Props) => {
  const [open, setOpen] = useState(true)

  return (
    <LayerPopup isOpen={open} onClose={() => setOpen(false)} width={500}>
      <Image src="/" alt="guide" width={480} height={240} />
      <h2>공지사항</h2>
      <List>
        {items?.map((item) => (
          <li key={item.seq}>
            <a href={`/board/view/${item.seq}`}>{item.subject}</a>
          </li>
        ))}
      </List>
    </LayerPopup>
  )
}

export default React.memo(NoticeModal)
