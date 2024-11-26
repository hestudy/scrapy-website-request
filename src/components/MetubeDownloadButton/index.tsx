'use client'

import { Request } from '@/payload-types'
import { useRequest } from 'ahooks'
import { Download, Loader } from 'lucide-react'
import { toast } from 'sonner'
import fetchMetube from '../ScrapyList/actions/fetchMetube'
import { Button } from '../ui/button'

const MetubeDownloadButton = (props: { item: Request }) => {
  const downloadReq = useRequest(
    async () => {
      const res = await fetchMetube(props.item.title!, props.item.url).catch((e: Error) => {
        toast.error(e.message)
        return null
      })
      if (res) {
        toast.success('Download started')
      }
    },
    {
      manual: true,
    },
  )

  return (
    <Button variant={'ghost'} size={'sm'} disabled={downloadReq.loading} onClick={downloadReq.run}>
      {!downloadReq.loading && <Download />}
      {downloadReq.loading && <Loader className="text-blue-500 animate-spin"></Loader>}
    </Button>
  )
}

export default MetubeDownloadButton
