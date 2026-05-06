const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('BROWSER ERROR:', msg.text());
  });
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  page.on('response', response => {
    if (!response.ok()) {
      console.log('NETWORK ERROR:', response.status(), response.url());
    }
  });
  await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle0' });
  console.log('Page loaded');
  await browser.close();
})();
