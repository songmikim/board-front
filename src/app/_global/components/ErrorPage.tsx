'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import ContentBox from './ContentBox'
import { Button } from './Buttons'
import fontsize from '../styles/fontsize'

interface ErrorPageProps {
  statusCode: number | string
  title: string
  description?: string
}

const Wrapper = styled.section`
  max-width: 400px;
  margin: 0 auto;
  padding: 40px 16px;
  text-align: center;

  h1 {
    font-size: 4rem;
    margin: 0 0 20px;
  }

  h2 {
    margin: 0 0 10px;
  }

  p {
    margin: 0 0 30px;
  }
`

const Wrapper = styled.div`
  text-align: center;
  padding: 120px 0;
`

const StatusCode = styled.h1`
  font-size: 5rem;
  margin: 0 0 20px;
`

const Title = styled.h2`
  font-size: ${fontsize.extra};
  margin: 0 0 10px;
`

const Description = styled.p`
  font-size: ${fontsize.normal};
  margin: 0 0 30px;
`

export default function ErrorPage({
  statusCode,
  title,
  description,
}: ErrorPageProps) {
  const router = useRouter()

  return (
    <ContentBox>
      <Wrapper>
        <StatusCode>{statusCode}</StatusCode>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
        <Button type="button" onClick={() => router.push('/')}>홈으로 이동</Button>
      </Wrapper>
    </ContentBox>
  )
}
