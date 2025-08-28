'use client'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import loadable from '@loadable/component'
import type {
  BoardConfigType,
  BoardDataType,
  BoardSearchType,
} from '../_types/BoardType'
import CommonContainer from '../_wrappers/CommonContainer'
import BoardView from '../_components/BoardView'
import CommonContext from '@/app/_global/contexts/CommonContext'
import { getList } from '../_services/boardData'
const ListContainer = loadable(() => import('./ListContainer'))

const ViewContainer = ({
  board,
  data,
  search,
}: {
  board?: BoardConfigType
  data?: BoardDataType
  search?: BoardSearchType
}) => {
  const [items, setItems] = useState<Array<BoardDataType> | null | undefined>(
    [],
  )
  const [pagination, setPagingation] = useState<any>()
  search = search ?? {}

  const {
    actions: { setMainTitle },
  } = useContext(CommonContext)

  useLayoutEffect(() => {
    if (data && board) {
      setMainTitle(`${data.subject}|${board.name}`)
    }
  }, [data, board, setMainTitle])

  useEffect(() => {
    if (board?.showViewList && board?.bid) {
      ;(async () => {
        const data = await getList(board.bid, search)
        const { items, pagination } = data
        setItems(items)
        setPagingation(pagination)
      })()
    }
  }, [board?.showViewList, board?.bid, search])

  return (
    <CommonContainer board={board} data={data}>
      <BoardView board={board} data={data} />
      {board?.showViewList && (
        <ListContainer items={items} pagination={pagination} search={search} />
      )}
    </CommonContainer>
  )
}

export default React.memo(ViewContainer)
