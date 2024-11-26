import { TaskHandler } from 'payload'
import { HTTPRequest, Page } from 'puppeteer-core'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

const launchArgs = JSON.stringify({
  args: ['--disable-features=site-per-process'],
})

export const getWebsiteAllRequest: TaskHandler<'getWebsiteAllRequest'> = async ({ input, req }) => {
  await req.payload.update({
    collection: 'urls',
    id: input.id,
    data: {
      status: 'pending',
    },
  })

  try {
    const browserWSEndpoint = new URL(process.env.BROWSERLESS_ENDPOINT!)
    browserWSEndpoint.searchParams.append('launch', launchArgs)
    const browser = await puppeteer.connect({
      browserWSEndpoint,
    })
    const page: Page = await browser.newPage()
    const data: HTTPRequest[] = []
    page.on('request', (request: HTTPRequest) => {
      if (
        request.url().toLowerCase().includes('m3u8') ||
        request.url().toLowerCase().includes('mp4')
      ) {
        data.push(request)
      }
    })
    await page.goto(input.url, {
      waitUntil: 'networkidle0',
      timeout: 60 * 1000,
    })
    const title = await page.title()
    return {
      output: {
        data: data.map((item) => {
          return {
            url: item.url(),
            header: item.headers(),
            body: item.postData(),
            scrapyUrl: input.id,
            title,
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
