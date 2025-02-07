const fs = require('fs');
const main_view = fs.readFileSync('./index.html', 'utf-8');
const order_view = fs.readFileSync('./orderList.html', 'utf-8');

const mariadb = require('./database/connect/mariadb');

function main(response){
	console.log('main');
	mariadb.query('SELECT * FROM product', function(error, rows){
		console.log(rows);
	});
	response.writeHead(200, {'Content-Type' : 'text/html'});
	response.write(main_view);
	response.end();
}

function login(response){
	console.log('login');
	response.writeHead(200, {'Content-Type' : 'text/html'});
	response.write('This is Login');
	response.end();
}

function favicon(){
	console.log('favicon');
}

function redRacket(response){
	fs.readFile('./img/redRacket.png', function(err, data){
		response.writeHead(200, {'Content-Type' : 'text/html'});
		response.write(data);
		response.end();
	});
}

function blueRacket(response){
	fs.readFile('./img/blueRacket.png', function(err, data){
		response.writeHead(200, {'Content-Type' : 'text/html'});
		response.write(data);
		response.end();
	});
}

function blackRacket(response){
	fs.readFile('./img/blackRacket.png', function(err, data){
		response.writeHead(200, {'Content-Type' : 'text/html'});
		response.write(data);
		response.end();
	});
}

function order(response, productId){
	response.writeHead(200, {'Content-Type' : 'text/html'});
	mariadb.query("INSERT INTO orderlist VALUES(" + productId + ", '" + new Date().toLocaleDateString() + "');", function(err, rows){
		console.log(rows);
	});
	response.write(
		'Thank you for your order!<br>'+
		"You can check the result on the <a href = '/orderlist'>order list page</a>"
	)
	response.end();
}

function orderlist(response){
	response.writeHead(200, {'Content-Type' : 'text/html'});
	mariadb.query('SELECT * FROM orderlist', function(err, data){
		response.write(order_view);
		data.forEach(element => {
			response.write(
				'<tr>'+
				'<td>'+element.id+'</td>'+
				'<td>'+element.date+'</td>'+
				'</tr>'
			);
		});
		response.write('</table>');
		response.end();
	});
}

let handle = {};
handle['/'] = main;
handle['/login'] = login;
handle['/order'] = order;
handle['/orderlist'] = orderlist
handle['/favicon.ico'] = favicon;
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;
exports.handle = handle;