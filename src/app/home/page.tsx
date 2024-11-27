'use client'

import ScrapyList from '@/components/ScrapyList'
import ScrapyContext from '@/components/ScrapyList/contexts/ScrapyListContext'
import useScrapyListState from '@/components/ScrapyList/hooks/useScrapyListState'
import Input from '@/components/UrlInput'

const page = () => {
  const state = useScrapyListState()

  return (
    <ScrapyContext.Provider
      value={{
        ...state,
      }}
    >
      <Input></Input>
      <ScrapyList></ScrapyList>
    </ScrapyContext.Provider>
  )
}

export default page
