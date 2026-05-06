const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });

  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push('PAGE ERROR: ' + err.message));

  // Go to admin login, wait a bit longer
  await page.goto('http://localhost:3000/admin/login', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await new Promise(r => setTimeout(r, 4000)); // wait for JS to execute
  const rootLen = await page.evaluate(() => document.getElementById('root')?.innerHTML.length || 0);
  const rootStart = await page.evaluate(() => document.getElementById('root')?.innerHTML.substring(0, 150) || '');

  console.log(`Root HTML length: ${rootLen}`);
  console.log(`Root HTML start: ${rootStart}`);
  if (errors.filter(e => !e.includes('favicon')).length) {
    console.log('Errors:', errors.filter(e => !e.includes('favicon')));
  } else {
    console.log('No meaningful errors ✅');
  }
  await browser.close();
})();
