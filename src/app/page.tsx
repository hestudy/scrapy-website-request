'use client'

import ScrapyList from '@/components/ScrapyList'
import ScrapyContext from '@/components/ScrapyList/contexts/ScrapyListContext'
import useScrapyListState from '@/components/ScrapyList/hooks/useScrapyListState'
import Input from '@/components/UrlInput'

const page = () => {
  const state = useScrapyListState()

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      <ScrapyContext.Provider
        value={{
          ...state,
        }}
      >
        <Input></Input>
        <ScrapyList></ScrapyList>
      </ScrapyContext.Provider>
    </div>
  )
}

export default page
