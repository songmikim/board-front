import ErrorPage from './_global/components/ErrorPage'

export default function Forbidden() {
  return <ErrorPage status={403} message="접근 권한이 없습니다." />
}
