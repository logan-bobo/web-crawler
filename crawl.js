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
		if (link.href.slice(0,1) === '/') {
			try {
				returnList.push(new URL(`${baseURL}${link.href}`).href)
			} catch (err) {
				console.log(`${err.message} on ${link.href}`)
			}

		} else {
			try {
				returnList.push(new URL(link.href).href)
			} catch (err) {
				console.log(`${err.message} on ${link.href}`)
			}
		}
	}

	return returnList	
}

async function crawlPage(url) {
	try {
		let response = null 
	
		response = await fetch(url)
	
		if (!response.ok) {
			console.log("Bad request")
			process.exit(1)
		}

		if (!response.headers.get("content-type").includes('text/html;')) {
			console.log("Incorrect content type returned")
			process.exit(1)
		}

	return response.text()
	
	} catch (err) {
		console.log(err.message)	
	}
}

module.exports = {
	normalizeURL,
	extractURLsFromHTML,
	crawlPage
}

