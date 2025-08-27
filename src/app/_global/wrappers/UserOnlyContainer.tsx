'use client'
import { unauthorized } from 'next/navigation'
import useUser from '../hooks/useUser'

export default function UserOnlyContainer({ children }) {
  const { isLogin } = useUser()
  if (!isLogin) {
    unauthorized()
  }

  return children
}