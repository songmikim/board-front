import { getEvents } from './_services/actions'
import { MainTitle } from '../_global/components/TitleBox'
import EventListContainer from './_containers/EventListContainer'
import type CommonSearchType from '../_global/types/CommonSearchType'

export default async function EventPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<JSX.Element> {
  const params = await searchParams
  const search: CommonSearchType = {
    page: Number(params?.page as string) || 1,
    sopt: params?.sopt as string,
    skey: params?.skey as string,
    sdate: params?.sdate as string,
    edate: params?.edate as string,
  }
  const { items: events, pagination } = await getEvents(search)
  return (
    <div className="layout-width pd-top30">
      <MainTitle border="true">환경 행사</MainTitle>
      <EventListContainer events={events} pagination={pagination} search={search} />
    </div>
  )
}
