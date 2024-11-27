import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import payload from '@/utils/payload'
import { Eye } from 'lucide-react'
import Link from 'next/link'

const page = async ({
  params,
}: {
  params: Promise<{
    page: string
  }>
}) => {
  const page = Number((await params).page)

  const docs = await payload.find({
    collection: 'urls',
    page,
    limit: 20,
  })

  return (
    <div className="h-full w-[800px] mx-auto space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>URL</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {docs.docs.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.url}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <Link href={`/home/urlDetail/${item.id}/1`}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Eye></Eye>
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Pagination className="justify-end">
        <PaginationContent>
          {docs.hasPrevPage && (
            <PaginationItem>
              <PaginationPrevious href={`/home/urlList/${page - 1}`}></PaginationPrevious>
            </PaginationItem>
          )}
          {Array.from({ length: docs.totalPages }, (_, i) => i + 1).map((item) => {
            return (
              <PaginationItem key={item}>
                <PaginationLink href={`/home/urlList/${item}`}>{item}</PaginationLink>
              </PaginationItem>
            )
          })}
          {docs.hasNextPage && (
            <PaginationItem>
              <PaginationNext href={`/home/urlList/${page + 1}`}></PaginationNext>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default page
