const chromium = require("@sparticuz/chromium-min");
const puppeteer = require("puppeteer-core");

export default async (req, res) => {
  const { url, w, h } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is missing' });
  }

  try {
    const screenshot = await take_screenshot(url, w, h);
    res.statusCode = 200;
    res.setHeader("Content-Type", `image/jpeg`);
    res.end(screenshot);
  } catch (error) {
    console.error('Error:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(error.message || 'Unknown error');
  }
};

export async function take_screenshot(url, width, height) {
  width = Number(width) || 800;
  height = Number(height) || 600;

  const browser = await puppeteer.launch({
    args: chromium.args,
    headless: "new",
    executablePath: process.env.NODE_ENV == "development"
      ? process.env.CHROMIUM_DEV_EXECUTABLE_PATH
      : await chromium.executablePath("https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar"),
    ignoreHTTPSErrors: true
  });

  const page = await browser.newPage();

  try {
    await page.setViewport({
      width: width,
      height: height
    });

    await page.setBypassCSP(true);
    await page.goto(url);

    console.log("Screenshot of " + url + " at " + width + "x" + height);

    const results = await page.screenshot({type: 'jpeg', quality: 85, fullPage: false});

    return results;
    
  } catch (error) {
    console.error("Error:", error);
    return { error: "Error checking page" };
  } finally {
    await page.close();
    await browser.close();
  }
}