'use client'

import { useRequest } from 'ahooks'
import { useState } from 'react'
import { toast } from 'sonner'
import useScrapyList from '../ScrapyList/hooks/useScrapyList'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import createUrl from './actions/createUrl'
import { CheckCheck, CircleX, Loader } from 'lucide-react'

const UrlInput = () => {
  const { run, urlReq } = useScrapyList()
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
      <Input
        type="url"
        placeholder="please input url"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value)
        }}
      />
      <Button disabled={saveReq.loading} onClick={saveReq.run}>
        Scrapy
      </Button>
      {urlReq?.data?.status && (
        <div className="flex items-center space-x-2 justify-end">
          <div>{urlReq?.data?.status}</div>
          {(urlReq.data.status === 'pending' || urlReq.data.status === 'waiting') && (
            <Loader className="animate-spin text-blue-500" />
          )}
          {urlReq.data.status === 'done' && <CheckCheck className="text-green-500" />}
          {urlReq.data.status === 'failed' && <CircleX className="text-red-500" />}
        </div>
      )}
    </div>
  )
}

export default UrlInput
