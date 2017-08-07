var express = require('express');
var app = express();
var mysql = require('mysql');
let http = require('http');
let server = http.Server(app);
var bodyParser = require('body-parser');

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

app.use(bodyParser.text({ type: 'text/html' }))

app.get('/search', function(req, res) {
	var arr = {
		items: [],
	}
	var getQuery =  'SELECT g4_write_portfolio.wr_subject, ' + 
					'g4_write_portfolio.wr_datetime, ' + 
					'g4_write_portfolio.wr_content, ' + 
					'g4_board_file.bf_file ' +
					'FROM g4_write_portfolio ' +
					'LEFT OUTER JOIN g4_board_file ON (g4_board_file.wr_id = g4_write_portfolio.wr_id) '

	connection.query(getQuery, function (error, results, fields) {
		var regex = /(<([^>]+)>)/ig;

		if (error) throw error;

		for (var i in results){

			let str = results[i].wr_content.toString();
			let result = str.replace(regex, "");

			var data = {
				subject: results[i].wr_subject.toString(),
				writeTime: results[i].wr_datetime.toString(),
				contents: result,
				thumbnail: "http://gnscjfdl.cafe24.com/bbs/data/file/portfolio/" + results[i].bf_file
			}

			if('' + results[i].bf_file != 'null') {
				arr.items.push(data);
			}
		
		}

		res.send(arr);
	});
});


app.use('/', function(req, res){
	res.sendfile('./src/article.html')
});
// Server ON:3500
server.listen(5000, () => console.log('listening on *:5000'));
