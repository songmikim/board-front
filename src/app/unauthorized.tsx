import ErrorPage from './_global/components/ErrorPage'

export default function Unauthorized() {
  return <ErrorPage status={401} message="로그인이 필요한 페이지입니다." />
}
