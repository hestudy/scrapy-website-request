import { CollectionConfig } from 'payload'

export const Urls: CollectionConfig = {
  slug: 'urls',
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      validate: (val) => {
        if (!val?.startsWith('http')) return 'Must be a valid URL'
        return true
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'waiting',
      options: [
        {
          label: '等待',
          value: 'waiting',
        },
        {
          label: '进行中',
          value: 'pending',
        },
        {
          label: '完成',
          value: 'done',
        },
        {
          label: '失败',
          value: 'failed',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        if (doc?.status === 'waiting') {
          await req.payload.jobs.queue({
            workflow: 'scrapyWebsiteRequest',
            input: {
              url: doc.url,
              id: doc.id,
            },
          })
          req.payload.jobs.run()
        }
      },
    ],
  },
}
