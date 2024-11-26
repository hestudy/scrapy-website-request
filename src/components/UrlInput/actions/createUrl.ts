'use server'

import payload from '@/utils/payload'

const createUrl = async (url: string) => {
  const res = await payload.create({
    collection: 'urls',
    data: {
      url,
      status: 'waiting',
    },
  })

  return res
}

export default createUrl
