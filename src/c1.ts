import { Page } from "puppeteer/lib/types";
import { githubLogin } from "./github";

export async function uploadAlgo(page: Page, pathToAlgo: string): Promise<void> {
  await page.goto(`https://terminal.c1games.com/accounts/login/`);
  // await page.waitForNavigation();
  await page.waitForSelector("#ledger-signup-btn")
  await page.waitForTimeout(1*1000); // wait 1 second after it's loaded
  // click on github login and do it
  await page.click("#ledger-signup-btn")
  await githubLogin(page)
  
  // actually upload the algo
  await page.goto(`https://terminal.c1games.com/myalgos`);
  await page.waitForSelector("#uploadfolder");
  await page.waitForTimeout(2*1000);
  const uploadInputHandle = await page.$("#uploadfolder");

  // accept the confirmation dialogue that will appear after upload
  page.on("dialog", (dialog) => {
    dialog.accept();
  });
  await uploadInputHandle.uploadFile(pathToAlgo);
  await page.waitForTimeout(5*1000); // 5 seconds wait time
  console.log("Done! Go to https://terminal.c1games.com/myalgos to view your algo.");
  console.log('Still waiting on matches to be played...');
  await page.waitForSelector('.algo-rating', { timeout: 30*1000 });
  await page.waitForTimeout(5*1000);
    
  for(let i = 0; i < 30; ++i) {
    await page.reload();
    await page.waitForTimeout(6*1000);
    await clickOnLatestAlgo(page);
    const unfinishedMatches = await page.$x('//div[contains(@class, "algo-matches")]//span[contains(text(),"This algo has not played any matches yet.")]');
    if(unfinishedMatches.length === 0) break;
  }
  console.log(`Looks like some matches have finally completed :)`);
}


async function clickOnLatestAlgo(page: Page) {
  const cardHandlers = await page.$$('.card.algo-card.uploaded');
  await cardHandlers[cardHandlers.length-1].click();
  await page.waitForTimeout(3*1000); // 3 seconds
}