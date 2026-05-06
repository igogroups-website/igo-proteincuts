const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
  page.on('requestfailed', request =>
    console.log('REQUEST FAILED:', request.url(), request.failure()?.errorText)
  );

  console.log('Navigating to localhost:3000...');
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 10000 });
  } catch (e) {
    console.log('Navigation failed/timeout:', e.message);
  }

  console.log('Taking screenshot just in case...');
  await page.screenshot({ path: 'debug_screenshot.png' });

  await browser.close();
})();
