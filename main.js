const { crawlPage } = require('./crawl.js')

async function main() {
	let toCrawl = null

	if (process.argv.length > 2 && process.argv.length < 4) {
		toCrawl = process.argv[2]
	} else {
		console.log("Incorrect arguments supplied")
		process.exit(1)
	}

	console.log(`Crawling... ${toCrawl}`)
	let pageData = await crawlPage(toCrawl)
	console.log(pageData)	
}

main()

