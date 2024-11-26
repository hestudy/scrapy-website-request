'use client'

import { ModeToggle } from '@/components/ModeToggle'
import ScrapyList from '@/components/ScrapyList'
import ScrapyContext from '@/components/ScrapyList/contexts/ScrapyListContext'
import useScrapyListState from '@/components/ScrapyList/hooks/useScrapyListState'
import { ThemeProvider } from '@/components/ThemeProvider'
import { TooltipProvider } from '@/components/ui/tooltip'
import Input from '@/components/UrlInput'
import '@/global.css'
import '@fontsource/roboto'
import { Toaster } from 'sonner'

const page = () => {
  const state = useScrapyListState()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-primary">
        <Toaster richColors closeButton></Toaster>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <div className="fixed z-1 right-2 top-2">
              <ModeToggle></ModeToggle>
            </div>
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
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default page
