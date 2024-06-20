const { chromium } = require("playwright");

(async () => {
  let browser;

  try {
    // Launch browser
    browser = await chromium.launch({
      headless: false, // Set to true for headless mode
      slowMo: 50, // Slow down by 50ms for better debugging
    });

    // Create a new browser context
    const context = await browser.newContext({
      permissions: ["geolocation"], // Grant geolocation permission if required
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36", // Example user agent
    });

    // Create a new page within the context
    const page = await context.newPage();

    // Navigate to the login page
    await page.goto("https://www.airindiaexpress.com/home", {
      waitUntil: "domcontentloaded", // Wait until DOM content is loaded
      timeout: 90000, // Timeout in milliseconds
    });

    // Click on the login button
    await page.click("span.header-b2c-login-text");

    // Wait for the partner radio button to appear and click it
    await page.waitForSelector(
      "div.login-radio-button-list-item input#Partner",
      { timeout: 30000 }
    );
    await page.click("div.login-radio-button-list-item input#Partner");

    // Fill in the email and password fields
    await page.fill("input#email-input-sso", "OTAINDELBL_ADMIN");
    await page.fill("input#password-input-sso", "Balmonksb@244");

    // Click the login button
    await page.click("button.login-modal-btn");

    // Wait for navigation to complete
    await page.waitForNavigation({
      waitUntil: "domcontentloaded",
      timeout: 90000,
    });

    // Check if the navigation was successful
    if (page.url() === "https://www.airindiaexpress.com/partner-home") {
      console.log("Login successful! Navigated to partner home page.");
    } else {
      throw new Error(
        "Navigation to partner home page failed. Current URL: " + page.url()
      );
    }

    // Example: Perform further actions after successful login
    // await page.click("#some-element");
    // await page.waitForSelector("#some-element-loaded");

    // Continue interacting with the page...
  } catch (error) {
    console.error("Error during login process:", error);

    // Example: Retry logic
    // Uncomment and modify as per your specific needs
    /*
    console.log("Retrying login...");
    await page.reload();
    await page.waitForSelector("span.header-b2c-login-text");
    await page.click("span.header-b2c-login-text");
    // Continue with login steps...
    */
  } finally {
    // Keep browser open to stay logged in
    // await browser.close(); // Commented out to keep the browser open
  }
})();
