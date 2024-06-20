const puppeteer = require("puppeteer");

// (async () => {
//   let browser;

//   try {
//     browser = await puppeteer.launch({
//       headless: false, // Set to true for headless mode
//       slowMo: 50, // Slow down by 50ms for better debugging
//     });

//     const page = await browser.newPage();

//     await page.goto("https://www.airindiaexpress.com/home", {
//       waitUntil: "networkidle0",
//       timeout: 90000,
//     });

//     await page.click("span.header-b2c-login-text");
//     await page.waitForSelector(
//       "div.login-radio-button-list-item input#Partner"
//     );
//     await page.click("div.login-radio-button-list-item input#Partner");
//     await page.type("input#email-input-sso", "OTAINDELBL_ADMIN");
//     await page.type("input#password-input-sso", "Balmonksb@244");
//     await Promise.all([
//       page.click("button.login-modal-btn"),
//       page.waitForNavigation({ waitUntil: "networkidle0", timeout: 90000 }),
//     ]);

//     // Check if the navigation was successful
//     if (page.url() === "https://www.airindiaexpress.com/partner-home") {
//       console.log("Login successful! Navigated to partner home page.");
//     } else {
//       throw new Error(
//         "Navigation to partner home page failed. Current URL: " + page.url()
//       );
//     }

//     // Example: Perform further actions after successful login
//     // await page.click("#some-element");
//     // await page.waitForSelector("#some-element-loaded");

//     // Continue interacting with the page...
//   } catch (error) {
//     console.error("Error during login process:", error);

//     // Example: Retry logic
//     // Uncomment and modify as per your specific needs
//     /*
//     console.log("Retrying login...");
//     await page.reload({ waitUntil: "networkidle0" });
//     await page.waitForSelector("span.header-b2c-login-text");
//     await page.click("span.header-b2c-login-text");
//     // Continue with login steps...
//     */
//   } finally {
//     // Keep browser open to stay logged in
//     // await browser.close(); // Commented out to keep the browser open
//   }
// })();
