const { JSDOM } = require("jsdom");

function normalizeURL(url) {
  urlObj = new URL(url);

  if (urlObj.pathname[urlObj.pathname.length - 1] === "/") {
    urlObj.pathname = urlObj.pathname.substring(0, urlObj.pathname.length - 1);
  }

  return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`;
}

function extractURLsFromHTML(htmlBody, baseURL) {
  let returnList = [];
  let dom = new JSDOM(htmlBody);
  let links = dom.window.document.querySelectorAll("a");

  for (let link of links) {
    // catch relative links
    if (link.href.slice(0, 1) === "/") {
      try {
        returnList.push(
          new URL(`${baseURL.slice(0, baseURL.length)}${link.href}`).href,
        );
      } catch (err) {
        console.log(`${err.message} on ${link.href}`);
      }
    } else {
      try {
        returnList.push(new URL(link.href).href);
      } catch (err) {
        console.log(`${err.message} on ${link.href}`);
      }
    }
  }

  return returnList;
}

async function crawlPage(baseURL, currentURL, pages) {
  if (!currentURL.includes(new URL(baseURL).host)) {
    return pages;
  }
  currentURL = normalizeURL(currentURL);

  if (!(currentURL in pages)) {
    if (currentURL === normalizeURL(baseURL)) {
      pages[currentURL] = 0;
    } else {
      pages[currentURL] = 1;
    }
  } else {
    pages[currentURL]++;

    return pages;
  }

  try {
    response = await fetch(currentURL);
    console.log(`Crawling... ${currentURL}`);

    if (!response.ok) {
      console.log("Bad request");
      return pages;
    }

    if (!response.headers.get("content-type").includes("text/html")) {
      console.log("Incorrect content type returned");
      return pages;
    }

    let responseText = await response.text();
    let returnLinks = extractURLsFromHTML(responseText, baseURL);

    for (let link of returnLinks) {
      pages = await crawlPage(baseURL, link, pages);
    }

    return pages;
  } catch (err) {
    console.log(err.message);
    return pages;
  }
}

module.exports = {
  normalizeURL,
  extractURLsFromHTML,
  crawlPage,
};
