const { JSDOM } = require('jsdom')
const { argv } = require('node:process');

function normalizeURL(url) {
	urlObj = new URL(url)

	if (urlObj.pathname[urlObj.pathname.length - 1] === '/') {
		urlObj.pathname = urlObj.pathname.substring(0, urlObj.pathname.length - 1);
	}

	return `${urlObj.host}${urlObj.pathname}` 
}

function extractURLsFromHTML(htmlBody, baseURL) {
	let returnList = []
	let dom = new JSDOM(htmlBody)
	let links = dom.window.document.querySelectorAll('a')

	for (link of links) {
		if (link.href[0] === '/') {
			link.href = new URL(`${baseURL}${link.href}`)
		}
		returnList.push(new URL(link.href).href)
	}

	return returnList	
}

function main() {
	let toCrawl = null

	if (process.argv.length > 2 && process.argv.length < 4) {
		toCrawl = process.argv[2]
	} else {
		console.log("Incorrect arguments supplied")
		process.exit(1)
	}

	console.log(`Crawling... ${toCrawl}`)
}

main()

module.exports = {
	normalizeURL,
	extractURLsFromHTML,	
}

