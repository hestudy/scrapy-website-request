import { TaskHandler } from 'payload'

export const saveWebsiteAllRequest: TaskHandler<'saveWebsiteAllRequest'> = async ({
  input,
  req,
}) => {
  for await (const item of input.data) {
    await req.payload.create({
      collection: 'requests',
      data: item,
    })
  }

  return {
    output: {},
  }
}
