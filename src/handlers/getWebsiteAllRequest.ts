import { TaskHandler } from 'payload'
import puppeteer, { HTTPRequest } from 'puppeteer'

export const getWebsiteAllRequest: TaskHandler<'getWebsiteAllRequest'> = async ({ input, req }) => {
  const pwEndpoint = process.env.BROWSERLESS_ENDPOINT || ''
  const launchArgs = JSON.stringify({ stealth: true, headless: false })
  const browser = await puppeteer.connect({
    browserWSEndpoint: `${pwEndpoint}&launch=${launchArgs}`,
  })
  const page = await browser.newPage()
  const data: HTTPRequest[] = []
  page.on('request', (request) => {
    data.push(request)
  })
  await page.goto(input.url, {
    waitUntil: 'networkidle0',
    timeout: 30 * 1000,
  })
  await req.payload.update({
    collection: 'urls',
    id: input.id,
    data: {
      status: 'done',
    },
  })
  // for await (const item of data) {
  //   try {
  //     item.data = await item.text()
  //   } catch (e) {}
  // }
  return {
    output: {
      data: data.map((item) => {
        return {
          url: item.url(),
          header: item.headers(),
          // data: item.data,
          scrapyUrl: input.id,
        }
      }),
    },
  }
}
