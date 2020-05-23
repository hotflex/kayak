function processUrl(url) {
	console.log(1, url)
	url = url.replace(/\/$/, "")

	console.log(2, url)

	if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
		url = "https://" + url
		console.log(3, url)
	}

	if (!/\.[.git]+$/i.test(url)) {
		url = url + ".git"
		console.log(4, url)
	}

	/**
	 * this is really hacky, but so is this entire project
	 * cuts off the '@ver'
	 */
	url = url.replace(/@.*./, "")

	console.log(5, url)

	return url
}

module.exports = processUrl
