'use server'
import { redirect } from 'next/navigation'
import { fetchSSR } from '@/app/_global/libs/utils'
import { toPlainObj } from '@/app/_global/libs/commons'

export async function processBoardConfig(errors, formData: FormData) {
  errors = {}
  const params = toPlainObj(formData)
  const searchParams = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'boolean') {
      searchParams.append(key, value ? 'true' : 'false')
    } else if (value !== undefined && value !== null) {
      searchParams.append(key, String(value))
    }
  }
  
  // 필수 항목 검증 S
  let hasErrors: boolean = false

  if (!params.bid || !params.bid.trim()) {
    errors.bid = '게시판 아이디를 입력하세요.'
    hasErrors = true
  }

  if (!params.name || !params.name.trim()) {
    errors.name = '게시판 이름을 입력하세요.'
    hasErrors = true
  }

  if (hasErrors) {
    return errors
  }
  // 필수 항목 검증 S
  // API 백엔드에 처리 요청
  const res = await fetchSSR('/board/update/config', {
    method: params.mode === 'update' ? 'PATCH' : 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: searchParams,
  })

  // 처리 실패시
  if (res.status !== 200 && res.status !== 201) {
    return await res.json()
  }

  // 처리 성공시 - 게시판 설정 목록으로 이동
  redirect('/admin/board')
}
