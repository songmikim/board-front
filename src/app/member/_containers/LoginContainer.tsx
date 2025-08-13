'use client'
import React, { useActionState, useState, useCallback } from 'react'
import { processLogin } from '../_services/actions'
import LoginForm from '../_components/LoginForm'

type FormType = {
  email: string
  password: string
}

const LoginContainer = () => {
  const [errors, action, pending] = useActionState<any, any>(processLogin, {})
  const [form, setForm] = useState<FormType>({
    email: '',
    password: '',
  })

  const onChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  return (
    <LoginForm
      errors={errors}
      action={action}
      pending={pending}
      form={form}
      onChange={onChange}
    />
  )
}

export default React.memo(LoginContainer)
