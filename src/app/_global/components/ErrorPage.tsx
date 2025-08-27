'use client'

import Link from 'next/link'
import styled from 'styled-components'
import { Button } from './Buttons'

interface ErrorPageProps {
  statusCode?: number
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

export default function ErrorPage({ statusCode, title, description }: ErrorPageProps) {
  return (
    <Wrapper>
      {statusCode && <h1>{statusCode}</h1>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <Link href="/" passHref legacyBehavior>
        <Button as="a" type="button" center>
          홈으로 이동
        </Button>
      </Link>
    </Wrapper>
  )
}
