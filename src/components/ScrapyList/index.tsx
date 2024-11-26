'use client'

import useScrapyList from './hooks/useScrapyList'

const ScrapyList = () => {
  const { scrapyReq, urlReq } = useScrapyList()

  return (
    <div className="mt-2 space-y-2">
      {urlReq?.data?.status}
      <div className="max-w-[500px] max-h-[500px] overflow-y-auto">
        {scrapyReq?.data?.docs.map((item) => {
          return <div key={item.id}>{item.url}</div>
        })}
      </div>
    </div>
  )
}

export default ScrapyList
