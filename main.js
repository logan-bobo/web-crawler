const { crawlPage } = require("./crawl.js");
const { report } = require("./report.js");

async function main() {
  let toCrawl = null;

  if (process.argv.length > 2 && process.argv.length < 4) {
    toCrawl = process.argv[2];
  } else {
    console.log("Incorrect arguments supplied");
    process.exit(1);
  }

  console.log(`Crawling... ${toCrawl}`);

  let pages = {};
  await crawlPage(toCrawl, toCrawl, pages);

  console.log("Crawl over...");

  console.log("Report:");
  report(pages);
}

main();
