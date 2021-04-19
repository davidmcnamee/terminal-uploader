import puppeteer from 'puppeteer-extra';
import { uploadAlgo } from './c1';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

async function run() {
  dotenv.config();
  // @ts-ignore https://github.com/berstend/puppeteer-extra/issues/428#issuecomment-778679665
  puppeteer.launch({ headless: false }).then(async browser => {
    const page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080 })
    try {
      const pathToAlgo = getAlgoLocation();
      console.log(`uploading algo at path ${pathToAlgo}`)
      await uploadAlgo(page, pathToAlgo)
    } catch(err) {
      console.error(`An error occured :(\n${err}`);
    }
    await browser.close()
  })
}

function getAlgoLocation() {
  const pathToAlgo = process.argv?.[2] ?? ""
  const isAbsolute = pathToAlgo.startsWith("/")
  const prefix = (isAbsolute ? "" : process.cwd())
  const fullPath = resolve(prefix,pathToAlgo);
  return fullPath;
}

run();
