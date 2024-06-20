const express = require("express");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

app.use(bodyParser.json());

const navigateToPage = async (page, url, retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Attempt ${attempt}: Navigating to ${url}`);
      await page.goto(url, {
        waitUntil: ["load", "domcontentloaded", "networkidle0"],
        timeout: 60000,
      });
      console.log(`Successfully navigated to ${url}`);
      return;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt === retries) {
        throw new Error(
          `Failed to navigate to ${url} after ${retries} attempts`
        );
      }
    }
  }
};

app.get("/indigo-lcc", async (req, res) => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: false });
    const context = browser.defaultBrowserContext();
    context.overridePermissions("https://www.facebook.com", [
      "geolocation",
      "notifications",
    ]);

    const page = await browser.newPage();
    await navigateToPage(
      page,
      "https://www.goindigo.in/agent.html?linkNav=Partner%2520Login%257CLogin%257CHeader%2520Menu"
    );

    await page.setViewport({ width: 1920, height: 1080, isMobile: false });

    await page.type(".input-text-field__input", "OTAINDELBL_ADMIN");
    await page.type(".input-text-field__input[type=password]", "Balmonksb@244");

    await Promise.all([
      page.click('[type="submit"]'),
      page.waitForNavigation({ waitUntil: "networkidle0", timeout: 60000 }),
    ]);

    await browser.close();
    res.status(200).send("LCC Demo");
  } catch (error) {
    console.error("Error:", error);
    if (browser) {
      const pageList = await browser.pages();
      if (pageList.length > 0) {
        await pageList[0].screenshot({ path: "error_screenshot.png" });
      }
      await browser.close();
    }
    res.status(500).send("An error occurred.");
  }
});

app.get("/air-india-express-lcc", async (req, res) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
      args: [
        "--start-maximized",
        "--disable-features=IsolateOrigins,site-per-process",
        "--disable-extensions",
        "--incognito",
        "--disable-web-security",
        "--disable-http2",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
      ],
    });

    const page = await browser.newPage();
    const context = browser.defaultBrowserContext();
    context.overridePermissions("https://www.airindiaexpress.com/home", [
      "geolocation",
      "notifications",
    ]);

    await navigateToPage(page, "https://www.airindiaexpress.com/home");

    await page.setViewport({ width: 1920, height: 1080 });

    // await page.waitForSelector("#signInName");
    // await page.waitForSelector("#password");
    // await page.waitForSelector("#next");

    page.on("dialog", async (dialog) => {
      console.log(dialog.message());
      await dialog.accept();
    });

    await page.type("#signInName", "OTAINDELBL_ADMIN");
    await page.type("#password", "Balmonksb@244");

    await Promise.all([
      page.click("#next"),
      page.waitForNavigation({ waitUntil: "networkidle0", timeout: 60000 }),
    ]);

    await browser.close();
    res.status(200).send("LCC Demo");
  } catch (error) {
    console.error("Error:", error);
    if (browser) {
      const pageList = await browser.pages();
      if (pageList.length > 0) {
        await pageList[0].screenshot({ path: "error_screenshot.png" });
      }
      await browser.close();
    }
    res.status(500).send("An error occurred.");
  }
});

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
