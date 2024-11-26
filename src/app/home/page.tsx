'use client'

import { ModeToggle } from '@/components/ModeToggle'
import ScrapyList from '@/components/ScrapyList'
import ScrapyContext from '@/components/ScrapyList/contexts/ScrapyListContext'
import useScrapyListState from '@/components/ScrapyList/hooks/useScrapyListState'
import { Button } from '@/components/ui/button'
import Input from '@/components/UrlInput'
import '@/global.css'
import '@fontsource/roboto'
import { LayoutList } from 'lucide-react'
import Link from 'next/link'

const page = () => {
  const state = useScrapyListState()

  return (
    <>
      <div className="fixed z-1 right-2 top-2 space-x-2">
        <Link href={'/home/urlList'}>
          <Button variant={'outline'} size={'icon'}>
            <LayoutList></LayoutList>
          </Button>
        </Link>
        <ModeToggle></ModeToggle>
      </div>
      <div className="w-full h-full flex justify-center items-center flex-col">
        <ScrapyContext.Provider
          value={{
            ...state,
          }}
        >
          <Input></Input>
          <ScrapyList></ScrapyList>
        </ScrapyContext.Provider>
      </div>
    </>
  )
}

export default page
