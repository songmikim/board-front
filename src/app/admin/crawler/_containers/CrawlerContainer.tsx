'use client'
import React, { useState, useCallback, useEffect } from 'react'
import useFetch from '@/app/_global/hooks/useFetch'
import CrawlerForm from '../_components/CrawlerForm'

type FormType = {
  source: string
  enabled: boolean
}

const CrawlerContainer = () => {
  const { data } = useFetch('/admin/crawler')
  const [form, setForm] = useState<FormType>({ source: '', enabled: false })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!data) return
    setForm({ source: data.source ?? '', enabled: data.enabled ?? false })
  }, [data])

  const onChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  const onToggle = useCallback(() => {
    setForm((prev) => ({ ...prev, enabled: !prev.enabled }))
  }, [])

  const onSave = useCallback(async () => {
    setSaving(true)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/crawler`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      alert('저장되었습니다.')
    } finally {
      setSaving(false)
    }
  }, [form])

  return (
    <CrawlerForm
      form={form}
      onChange={onChange}
      onToggle={onToggle}
      onSave={onSave}
      pending={saving}
    />
  )
}

export default React.memo(CrawlerContainer)