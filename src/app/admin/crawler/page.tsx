import AdminOnlyContainer from '@/app/_global/wrappers/AdminOnlyContainer'
import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import CrawlerContainer from './_containers/CrawlerContainer'

export default function AdminCrawlerPage() {
  return (
    <AdminOnlyContainer>
      <ContentBox width={600}>
        <MainTitle border>크롤링 관리</MainTitle>
        <CrawlerContainer />
      </ContentBox>
    </AdminOnlyContainer>
  )
}