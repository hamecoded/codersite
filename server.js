// var connect = require('connect');
// connect.createServer(
//     connect.static(__dirname)
// ).listen(8088);
// 
// 


// http://stackoverflow.com/questions/16966321/how-to-properly-use-html5-pushstate-in-backbone-js
// app.configure(function () {

//   // static files
//   app.use(express.static(__dirname + '/'));

//   // default html file (with any request)
//   app.use(function (req, res) {
//     var contents = fs.readFileSync(__dirname + '/index.html');
//     res.send(contents.toString());
//   });

// });


var express = require('express'),
        app = express();

app.configure(function(){
	app.use(express.static(__dirname + '/'));
});


app.get('*', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.listen(8088);