var express = require('express');
var app = express();
var mysql = require('mysql');
let http = require('http');
let server = http.Server(app);


var connection = mysql.createConnection({
  host     : 'gnscjfdl.cafe24.com',
  user     : 'gnscjfdl',
  password : 'gnscjfdl57',
  database : 'gnscjfdl'
});

connection.connect(function(err) {
  if (err) {
    console.error(err.stack);
    return;
  }
   console.log('connected as id ' + connection.threadId);
});


app.get('/search', function(req, res) {
	var arr = {
		items: []
	}
	
	connection.query('SELECT * FROM g4_board_file', function (error, results, fields) {
		if (error) throw error;
		//connection.end();		
		for (var i in results){
			var data = {
				thumbnail: 'http://gnscjfdl.cafe24.com/bbs/data/file/portfolio/' + results[i].bf_file
			}
			arr.items[i] = data;
		} 
		res.send(arr);
	});

    //res.sendfile('./src/article.html');
});

app.use('/', function(req, res){
	res.sendfile('./src/article.html')
});
// Server ON:3500
server.listen(4000, () => console.log('listening on *:4000'));
