var Pages = require('../models/pageModel.js');

var path = require('path');

var home = function(req, res){
	// // Set up query to find all page titles ordered by most recently updated
	// var pageQuery = Pages.find({}).select('title').sort({timestamp: -1});

	// // execute query
	// pageQuery.exec(function(err, pageTitles) {
	// 	// return either empty array or page title
	// 	if(err) {
	// 		res.status(500).send('Could not load page information');
	// 	}
	// 	res.render('home', {pageInfo:pageTitles});
	// });
    res.sendFile('main.html', { root: path.join(__dirname, '../public/views/layouts') });
    
};

var loadPages = function (req, res) {
    	 // Set up query to find all page titles ordered by most recently updated
	var pageQuery = Pages.find({}).sort({timestamp: -1});

	// execute query
	pageQuery.exec(function(err, pages) {
		// return either empty array or page title
		if(err) {
			res.status(500).send('Could not load page information');
		}
		res.json(pages);
	});
}

var login = function(req, res) {
	res.render('login');
}

module.exports.home = home;
module.exports.login = login;
module.exports.loadPages = loadPages;