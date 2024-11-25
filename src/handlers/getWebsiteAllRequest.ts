import { TaskHandler } from 'payload'
import { HTTPRequest } from 'puppeteer-core'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

export const getWebsiteAllRequest: TaskHandler<'getWebsiteAllRequest'> = async ({ input, req }) => {
  await req.payload.update({
    collection: 'urls',
    id: input.id,
    data: {
      status: 'pending',
    },
  })

  try {
    const browserWSEndpoint = process.env.BROWSERLESS_ENDPOINT || ''
    const browser = await puppeteer.connect({
      browserWSEndpoint,
    })
    const page = await browser.newPage()
    const data: HTTPRequest[] = []
    page.on('request', (request: HTTPRequest) => {
      data.push(request)
    })
    await page.goto(input.url, {
      waitUntil: 'networkidle0',
      timeout: 60 * 1000,
    })
    return {
      output: {
        data: data.map((item) => {
          return {
            url: item.url(),
            header: item.headers(),
            body: item.postData(),
            scrapyUrl: input.id,
          }
        }),
        id: input.id,
      },
    }
  } catch (e) {
    await req.payload.update({
      collection: 'urls',
      id: input.id,
      data: {
        status: 'failed',
      },
    })
    throw e
  }
}
