'use client'

import copy from 'clipboard-copy'
import { Copy } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import MetubeDownloadButton from '../MetubeDownloadButton'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import useScrapyList from './hooks/useScrapyList'

const ScrapyList = () => {
  const { scrapyReq } = useScrapyList()
  const [input, setInput] = useState('')

  const filter = scrapyReq?.data?.docs.filter((item) => item.url.includes(input))

  return (
    <div className="mt-2 space-y-2">
      <Input
        placeholder="search url"
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
        }}
      ></Input>
      <div className="max-w-[1000px] max-h-[500px] overflow-auto">
        <Table>
          <TableCaption>Request List</TableCaption>
          <TableHeader className="sticky top-0">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Url</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filter?.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger className="max-w-[800px] truncate">{item.url}</TooltipTrigger>
                      <TooltipContent>{item.url}</TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-right flex space-x-2">
                    <Button
                      variant={'ghost'}
                      size={'icon'}
                      onClick={() => {
                        copy(item.url).then(() => {
                          toast.success('Copied to clipboard')
                        })
                      }}
                    >
                      <Copy></Copy>
                    </Button>
                    <MetubeDownloadButton item={item}></MetubeDownloadButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ScrapyList
