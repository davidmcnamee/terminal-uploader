import { Page } from "puppeteer"


export async function githubLogin(page: Page) {
  await page.waitForSelector('#login_field')
  await page.type('#login_field', process.env.GITHUB_USER)
  await page.type('#password', process.env.GITHUB_PWD)
  await page.click('[name="commit"]')
  await page.waitForNavigation()
  await page.waitForTimeout(3*1000); // 3 seconds
}
