'use client'

import ContentBox from './ContentBox'
import { MainTitle } from './TitleBox'

interface ErrorPageProps {
  status: number
  message: string
}

export default function ErrorPage({ status, message }: ErrorPageProps) {
  return (
    <ContentBox width={420}>
      <MainTitle center="true">{status}</MainTitle>
      <p>{message}</p>
    </ContentBox>
  )
}
