import { useRequest } from 'ahooks'
import { toast } from 'sonner'
import requestList from '../actions/requestList'
import urlById from '../actions/urlById'

const useScrapyListState = () => {
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
      manual: true,
    },
  )

  const scrapyReq = useRequest(
    async (id: number) => {
      if (id) {
        const url = await urlReq.runAsync(id)
        const res = await requestList(id).catch((e: Error) => {
          toast.error(e.message)
          return null
        })
        if (url?.status === 'done' || url?.status === 'failed') {
          scrapyReq.cancel()
        }
        return res
      }
    },
    {
      pollingInterval: 3000,
      manual: true,
    },
  )

  const run = (id: number) => {
    urlReq.mutate(null)
    scrapyReq.mutate(null)
    scrapyReq.run(id)
  }

  return {
    urlReq,
    scrapyReq,
    run,
  }
}

export default useScrapyListState
