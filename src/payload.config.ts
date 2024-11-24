// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { zh } from '@payloadcms/translations/languages/zh'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Responses } from './collections/Responses'
import { Urls } from './collections/Urls'
import { Users } from './collections/Users'
import { getWebsiteAllRequest } from './handlers/getWebsiteAllRequest'
import { saveWebsiteAllRequest } from './handlers/saveWebsiteAllRequest'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Urls, Responses],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  i18n: {
    supportedLanguages: {
      zh,
      en,
    },
  },
  jobs: {
    tasks: [
      {
        retries: 3,
        slug: 'getWebsiteAllRequest',
        inputSchema: [
          {
            name: 'url',
            type: 'text',
            required: true,
          },
          {
            name: 'id',
            type: 'number',
            required: true,
          },
        ],
        outputSchema: [
          {
            name: 'data',
            type: 'array',
            required: true,
            fields: Responses.fields,
          },
        ],
        handler: getWebsiteAllRequest,
      },
      {
        retries: 3,
        slug: 'saveWebsiteAllRequest',
        inputSchema: [
          {
            name: 'data',
            type: 'array',
            required: true,
            fields: Responses.fields,
          },
        ],
        handler: saveWebsiteAllRequest,
      },
    ],
    workflows: [
      {
        slug: 'scrapyWebsiteRequest',
        inputSchema: [
          {
            name: 'url',
            type: 'text',
            required: true,
          },
          {
            name: 'id',
            type: 'number',
            required: true,
          },
        ],
        handler: async ({ job, tasks }) => {
          const output = await tasks.getWebsiteAllRequest('1', {
            input: {
              url: job.input.url,
              id: job.input.id,
            },
          })
          await tasks.saveWebsiteAllRequest('2', {
            input: {
              ...output,
            },
          })
        },
      },
    ],
  },
})
