'use client'
import React from 'react'
import styled from 'styled-components'
import { Textarea } from '@/app/_global/components/Forms'
import { Button } from '@/app/_global/components/Buttons'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  label {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`

type Props = {
  form: { source: string; enabled: boolean }
  onChange: (e: any) => void
  onToggle: () => void
  onSave: () => void
  pending: boolean
}

const CrawlerForm = ({ form, onChange, onToggle, onSave, pending }: Props) => {
  return (
    <StyledDiv>
      <Textarea
        name="source"
        placeholder="크롤링 소스를 입력하세요."
        value={form.source}
        onChange={onChange}
        height={200}
      />
      <label>
        <input type="checkbox" checked={form.enabled} onChange={onToggle} />
        사용
      </label>
      <Button onClick={onSave} disabled={pending}>
        저장
      </Button>
    </StyledDiv>
  )
}

export default React.memo(CrawlerForm)