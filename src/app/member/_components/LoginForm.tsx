import React from 'react'
import styled from 'styled-components'
import { Input } from '@/app/_global/components/Forms'
import { SubmitButton } from '@/app/_global/components/Buttons'
import MessageBox from '@/app/_global/components/MessageBox'

const StyledForm = styled.form``

const LoginForm = ({ errors, action, pending, form, onChange }) => {
  return (
    <StyledForm autoComplete="off">
      <Input type="text" name="email" placeholder="이메일을 입력하세요." />
      <Input
        type="password"
        name="password"
        placeholder="비밀번호를 입력하세요."
      />
      <SubmitButton type="submit">로그인</SubmitButton>
    </StyledForm>
  )
}

export default React.memo(LoginForm)
