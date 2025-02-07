function route(pathName, handle, response, productId){
	console.log('path name : ', pathName);
	if(typeof handle[pathName] == 'function'){
		handle[pathName](response, productId);
	}else{
		console.log(typeof handle[pathName]);
		response.writeHead(400, {'Content-Type' : 'text/html'});
		response.write('not found');
		response.end();
	}
}

exports.route = route;