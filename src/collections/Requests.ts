import { CollectionConfig } from 'payload'

export const Requests: CollectionConfig = {
  slug: 'requests',
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'method',
      type: 'text',
      required: true,
    },
    {
      name: 'header',
      type: 'json',
      required: true,
    },
    {
      name: 'body',
      type: 'text',
    },
    {
      name: 'scrapyUrl',
      type: 'relationship',
      relationTo: 'urls',
      required: true,
    },
  ],
}
