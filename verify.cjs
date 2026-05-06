const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });

  async function checkPage(url, label) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', err => errors.push('PAGE ERROR: ' + err.message));
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
    const rootLen = await page.evaluate(() => document.getElementById('root')?.innerHTML.length || 0);
    console.log(`\n[${label}] Root HTML length: ${rootLen}`);
    if (errors.length) {
      console.log(`[${label}] Errors (${errors.length}):`);
      errors.forEach(e => console.log('  ', e));
    } else {
      console.log(`[${label}] No errors detected ✅`);
    }
    await page.close();
  }

  await checkPage('http://localhost:3000/', 'HOME');
  await checkPage('http://localhost:3000/admin/login', 'ADMIN LOGIN');
  await browser.close();
})();
