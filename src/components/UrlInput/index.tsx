'use client'

import { useRequest } from 'ahooks'
import { useState } from 'react'
import { toast } from 'sonner'
import createUrl from './actions/createUrl'
import useScrapyList from '../ScrapyList/hooks/useScrapyList'

const UrlInput = () => {
  const { run } = useScrapyList()
  const saveReq = useRequest(
    async () => {
      if (url) {
        const res = await createUrl(url).catch((e: Error) => {
          toast.error(e.message)
          return null
        })
        if (res?.id) {
          run?.(res.id)
        }
        return res
      }
    },
    {
      manual: true,
    },
  )
  const [url, setUrl] = useState('')

  return (
    <div className="flex space-x-4">
      <input
        type="url"
        className="bg-slate-700 p-2 px-4 rounded"
        placeholder="please input url"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value)
        }}
      />
      <button
        className="bg-slate-900 py-2 px-4 rounded"
        disabled={saveReq.loading}
        onClick={saveReq.run}
      >
        Scrapy
      </button>
    </div>
  )
}

export default UrlInput
