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
      async ({ doc, req, operation }) => {
        if (operation === 'create') {
          await req.payload.jobs.queue({
            workflow: 'scrapyWebsiteRequest',
            input: {
              url: doc.url,
              id: doc.id,
            },
            queue: `scrapyWebsite-${doc.id}`,
          })
        }
        if (doc?.status === 'waiting') {
          req.payload.jobs.run({
            queue: `scrapyWebsite-${doc.id}`,
          })
        }
      },
    ],
  },
}
