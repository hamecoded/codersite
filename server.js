var express = require('express'),
        app = express(),
        engines = require('consolidate'),
        Poet = require('poet');


var poet = Poet(app, {
  posts: './_posts/',
  postsPerPage: 5,
  metaFormat: 'json',
  readMoreLink: function(post){
  	return '<a href="' + post.url + '" class="btn btn-primary">Read More <span class="glyphicon glyphicon-chevron-right"></span></a><hr>';
  }
});

poet.init().then(function () {
  // ready to go!
});

var env = process.env.NODE_ENV || 'development';

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.set("view options", { layout: false }); 
app.engine('.html', engines.jade);
app.use(express.static(__dirname + '/public'));

app.get('/posts*', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});
app.get('/poet', function (req, res) { res.render('index'); });

app.listen('development' == env ? 8088 : 80);