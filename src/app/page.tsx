import NoticeModal from './_components/NoticeModal'
import { getList } from '@/app/board/_services/boardData'

export default async function MainPage() {
  const { items } = await getList('notice', { limit: 5 })
  return <NoticeModal items={items} />
}
