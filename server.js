// var connect = require('connect');
// connect.createServer(
//     connect.static(__dirname)
// ).listen(8088);

var express = require('express'),
        app = express();

app.configure(function(){
	app.use(express.static(__dirname + '/'));
});

app.get('*', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
app.listen(8088);