import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import JoinContainer from '../_containers/JoinContainer'

export default function JoinPage() {
  return (
    <ContentBox width={420}>
      <MainTitle center="true">
        <h1>회원가입</h1>
      </MainTitle>
      <JoinContainer />
    </ContentBox>
  )
}
