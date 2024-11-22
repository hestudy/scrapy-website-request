import { TaskHandler } from 'payload'
import puppeteer, { HTTPRequest } from 'puppeteer'

export const getWebsiteAllRequest: TaskHandler<'getWebsiteAllRequest'> = async ({ input, req }) => {
  const pwEndpoint = process.env.BROWSERLESS_ENDPOINT || ''
  const browser = await puppeteer.connect({
    browserWSEndpoint: pwEndpoint,
  })
  const page = await browser.newPage()
  const data: HTTPRequest[] = []
  page.on('request', (request) => {
    data.push(request)
  })
  await page.goto(input.url)
  await req.payload.update({
    collection: 'urls',
    id: input.id,
    data: {
      status: 'done',
    },
  })
  return {
    output: {
      data: data.map((item) => {
        return {
          url: item.url(),
          method: item.method(),
          header: item.headers(),
          body: item.postData(),
          scrapyUrl: input.id,
        }
      }),
    },
  }
}
