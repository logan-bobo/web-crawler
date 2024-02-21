
function normalizeURL(url) {
	urlObj = new URL(url)

	if (urlObj.pathname[urlObj.pathname.length - 1] === '/') {
		urlObj.pathname = urlObj.pathname.substring(0, urlObj.pathname.length - 1);
	}

	return `${urlObj.host}${urlObj.pathname}` 
}

module.exports = {
	normalizeURL,
	
}

