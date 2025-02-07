let http = require('http');
let url = require('url');

function start(route, handle) {
	function onRequest(request, response) {
		let pathName = url.parse(request.url).pathname;
		let queryData = url.parse(request.url, true).query;
		route(pathName, handle, response, queryData.productId);
	}

	http.createServer(onRequest).listen(8888);
}

exports.start = start;