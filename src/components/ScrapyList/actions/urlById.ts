'use server'

import payload from '@/utils/payload'

const urlById = async (id: number) => {
  const res = await payload.findByID({
    collection: 'urls',
    id,
  })
  return res
}

export default urlById
