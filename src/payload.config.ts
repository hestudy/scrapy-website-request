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

import puppteer, { HTTPRequest } from 'puppeteer'
import { Media } from './collections/Media'
import { Urls } from './collections/Urls'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Urls],
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
        ],
        outputSchema: [
          {
            name: 'data',
            type: 'array',
            required: true,
            fields: [
              {
                name: 'url',
                type: 'text',
                required: true,
              },
            ],
          },
        ],
        handler: async ({ input }) => {
          const pwEndpoint = process.env.BROWSERLESS_ENDPOINT || ''
          const browser = await puppteer.connect({
            browserWSEndpoint: pwEndpoint,
          })
          const page = await browser.newPage()
          const data: HTTPRequest[] = []
          page.on('request', (request) => {
            data.push(request)
          })
          await page.goto(input.url)
          return {
            output: {
              data: data.map((item) => {
                return {
                  url: item.url(),
                }
              }),
            },
          }
        },
      },
      {
        retries: 3,
        slug: 'saveWebsiteAllRequest',
        inputSchema: [
          {
            name: 'data',
            type: 'array',
            required: true,
            fields: [
              {
                name: 'url',
                type: 'text',
                required: true,
              },
            ],
          },
        ],
        handler: async ({ input, req }) => {
          console.log(input)
          return {
            output: {},
          }
        },
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
        ],
        handler: async ({ job, tasks }) => {
          console.log(job.input)
          const output = await tasks.getWebsiteAllRequest('1', {
            input: {
              url: job.input.url,
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
