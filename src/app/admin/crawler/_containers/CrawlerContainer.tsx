'use client'
import React, { useState, useCallback } from 'react'
import { Button } from '@/app/_global/components/Buttons'
import CrawlerConfigForm from '../_components/CrawlerConfigForm'
import type { CrawlerConfigType } from '../_types'
import { saveCrawlerConfigs, setCrawlerScheduler } from '../_services/actions'

type Props = {
  initialConfigs: CrawlerConfigType[]
  initialScheduler: boolean
}

const emptyForm: CrawlerConfigType = {
  url: '',
  keywords: '',
  linkSelector: '',
  titleSelector: '',
  dateSelector: '',
  contentSelector: '',
  urlPrefix: '',
}

const CrawlerContainer = ({ initialConfigs, initialScheduler }: Props) => {
  const [forms, setForms] = useState<CrawlerConfigType[]>(
    initialConfigs.length ? initialConfigs : [emptyForm]
  )
  const [scheduler, setScheduler] = useState(initialScheduler)
  const [saving, setSaving] = useState(false)

  const onChange = useCallback(
    (
      index: number,
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const { name, value } = e.target
      setForms((prev) =>
        prev.map((form, i) => (i === index ? { ...form, [name]: value } : form)),
      )
    },
    [],
  )

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
      await saveCrawlerConfigs(body)
      alert('저장되었습니다.')
    } finally {
      setSaving(false)
    }
  }, [forms])

  const toggleScheduler = useCallback(async () => {
    const enabled = !scheduler
    setScheduler(enabled)
    await setCrawlerScheduler(enabled)
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
