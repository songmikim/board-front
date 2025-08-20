'use client'
import React, { useState, useCallback, useEffect } from 'react'
import useFetch from '@/app/_global/hooks/useFetch'
import { Button } from '@/app/_global/components/Buttons'
import CrawlerConfigForm from '../_components/CrawlerConfigForm'

type FormType = {
  url: string
  keywords: string
  linkSelector: string
  titleSelector: string
  dateSelector: string
  contentSelector: string
  urlPrefix: string
}

const emptyForm: FormType = {
  url: '',
  keywords: '',
  linkSelector: '',
  titleSelector: '',
  dateSelector: '',
  contentSelector: '',
  urlPrefix: '',
}

const CrawlerContainer = () => {
  const { data: configData } = useFetch('/api/v1/crawler/configs')
  const { data: schedulerData } = useFetch('/api/v1/crawler/scheduler')
  const [forms, setForms] = useState<FormType[]>([emptyForm])
  const [scheduler, setScheduler] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (configData) {
      setForms(
        configData.map((cfg) => ({
          url: cfg.url ?? '',
          keywords: cfg.keywords ? cfg.keywords.split('\n').join('\n') : '',
          linkSelector: cfg.linkSelector ?? '',
          titleSelector: cfg.titleSelector ?? '',
          dateSelector: cfg.dateSelector ?? '',
          contentSelector: cfg.contentSelector ?? '',
          urlPrefix: cfg.urlPrefix ?? '',
        }))
      )
    }
  }, [configData])

  useEffect(() => {
    if (schedulerData) {
      setScheduler(schedulerData.enabled ?? false)
    }
  }, [schedulerData])

  const onChange = useCallback((index, e) => {
    const { name, value } = e.target
    setForms((prev) => prev.map((form, i) => (i === index ? { ...form, [name]: value } : form)))
  }, [])

  const addForm = useCallback(() => {
    setForms((prev) => [...prev, { ...emptyForm }])
  }, [])

  const removeForm = useCallback((index) => {
    setForms((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const save = useCallback(async () => {
    setSaving(true)
    try {
      const body = forms.map((f) => ({
        url: f.url,
        keywords: f.keywords
          ? f.keywords.split('\n').map((k) => k.trim()).filter(Boolean)
          : [],
        linkSelector: f.linkSelector,
        titleSelector: f.titleSelector,
        dateSelector: f.dateSelector,
        contentSelector: f.contentSelector,
        urlPrefix: f.urlPrefix,
      }))
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/crawler/configs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      alert('저장되었습니다.')
    } finally {
      setSaving(false)
    }
  }, [forms])

  const toggleScheduler = useCallback(async () => {
    const enabled = !scheduler
    setScheduler(enabled)
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/crawler/scheduler?enabled=${enabled}`,
      { method: 'POST' }
    )
  }, [scheduler])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <input type="checkbox" checked={scheduler} onChange={toggleScheduler} />
        스케줄러 사용
      </label>

      {forms.map((form, index) => (
        <CrawlerConfigForm
          key={index}
          index={index}
          form={form}
          onChange={onChange}
          onRemove={removeForm}
        />
      ))}

      <div>
        <Button type="button" onClick={addForm} color="dark">
          추가
        </Button>
      </div>
      <div>
        <Button type="button" onClick={save} disabled={saving}>
          저장
        </Button>
      </div>
    </div>
  )
}

export default React.memo(CrawlerContainer)
