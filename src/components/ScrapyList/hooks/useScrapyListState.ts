import { useBoolean, useRequest } from 'ahooks'
import { useEffect } from 'react'
import { toast } from 'sonner'
import requestList from '../actions/requestList'
import urlById from '../actions/urlById'

const useScrapyListState = () => {
  const [ready, readyAc] = useBoolean(true)
  const urlReq = useRequest(
    async (id: number) => {
      if (id) {
        const res = await urlById(id).catch((e: Error) => {
          toast.error(e.message)
          return null
        })
        return res
      }
    },
    {
      pollingInterval: 3000,
      ready,
    },
  )

  useEffect(() => {
    if (urlReq.data?.status) {
      readyAc.set(urlReq.data?.status === 'pending' || urlReq.data.status === 'waiting')
    }
  }, [urlReq.data?.status])

  const scrapyReq = useRequest(
    async (id: number) => {
      if (id) {
        const res = await requestList(id).catch((e: Error) => {
          toast.error(e.message)
          return null
        })
        return res
      }
    },
    {
      pollingInterval: 3000,
      ready,
    },
  )

  const run = (id: number) => {
    urlReq.mutate(null)
    scrapyReq.mutate(null)
    urlReq.run(id)
    scrapyReq.run(id)
    readyAc.set(true)
  }

  return {
    urlReq,
    scrapyReq,
    run,
  }
}

export default useScrapyListState
