import { CollectionConfig } from 'payload'

export const Responses: CollectionConfig = {
  slug: 'responses',
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'header',
      type: 'json',
      required: true,
    },
    {
      name: 'data',
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
