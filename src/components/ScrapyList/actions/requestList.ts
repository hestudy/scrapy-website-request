'use server'

import payload from '@/utils/payload'

const requestList = async (id: number) => {
  const res = await payload.find({
    collection: 'requests',
    where: {
      scrapyUrl: {
        equals: id,
      },
    },
    pagination: false,
  })
  return res
}

export default requestList
