const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  const rootHtml = await page.evaluate(() => document.getElementById('root').innerHTML);
  console.log('ROOT HTML LENGTH:', rootHtml.length);
  console.log('ROOT HTML START:', rootHtml.substring(0, 200));
  await browser.close();
})();
