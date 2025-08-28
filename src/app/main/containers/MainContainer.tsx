import NoticeModal from '@/app/main/_components/NoticeModal'
import { getList } from '@/app/board/_services/boardData'

export default async function MainContainer() {
  const { items } = await getList('notice', { limit: 5 })
  return <NoticeModal items={items} />
}