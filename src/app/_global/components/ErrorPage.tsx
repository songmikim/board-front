'use client'

type ErrorPageProps = {
  statusCode: number
  title: string
  description?: string
}

export default function ErrorPage({ statusCode, title, description }: ErrorPageProps) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <h1>{statusCode}</h1>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}
