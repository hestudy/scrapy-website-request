import { HTTPRequest } from 'puppeteer-core'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { expect, test } from 'vitest'

puppeteer.use(StealthPlugin())

test('getWebsiteAllRequest', async () => {
  const browserWSEndpoint = process.env.BROWSERLESS_ENDPOINT || ''
  const browser = await puppeteer.connect({
    browserWSEndpoint,
  })
  const page = await browser.newPage()
  const data: HTTPRequest[] = []
  page.on('request', (request) => {
    console.log(request.url())
    data.push(request)
  })
  await page.goto('https://missav.com/dm13/ssk-044', {
    waitUntil: 'networkidle0',
    timeout: 60 * 1000,
  })
  //   await page.screenshot({ path: process.cwd() + '/screenshot.png', fullPage: true })
  expect(data.some((d) => d.url().includes('m3u8'))).toBe(true)
})
