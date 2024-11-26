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
  })
  return res
}

export default requestList
