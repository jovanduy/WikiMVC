var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var expressSession = require('express-session');
var app = express();

var index = require('./routes/index.js');
var pages = require('./routes/pages.js');
var initPassport = require('./passport/initPassport.js');

app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret: 'notReallyASecret',
	resave:false,
	saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());

initPassport(passport);

mongoose.connect('mongodb://bobby:droptables@ds017688.mlab.com:17688/bobbydropcollections');

app.get('/', index.home);

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect:'/',
	failureRedirect:'/'
}));

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.listen(3000);