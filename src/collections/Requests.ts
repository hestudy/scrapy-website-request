import { CollectionConfig } from 'payload'

export const Responses: CollectionConfig = {
  slug: 'requests',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'header',
      type: 'json',
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
