import payload from '@/utils/payload'

const page = async ({
  params,
}: {
  params: Promise<{
    id: string
    page: string
  }>
}) => {
  const { id, page: _page } = await params
  const page = Number(_page)

  const docs = await payload.find({
    collection: 'requests',
    where: {
      scrapyUrl: {
        equals: id,
      },
    },
    page,
    limit: 20,
  })

  return <div className="w-[800px]">page</div>
}

export default page
