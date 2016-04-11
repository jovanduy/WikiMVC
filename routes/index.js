var Pages = require('../models/pageModel.js');

var path = require('path');

var home = function(req, res){
	// At production it's better to get rid of all not-used commented code parts
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
    // I like the parameterization of your Page queries
	var pageQuery = Pages.find({}).sort({timestamp: -1});
	var data = {};

	// execute query
	pageQuery.exec(function(err, pages) {
		// return either empty array or page title
		if(err) {
			res.status(500).send('Could not load page information');
		}
		data.user = req.user !== undefined ? req.user : {};
		data.pages = pages;
		res.json(data);
	});
}

var editPages = function(req, res) {
	res.sendFile('other.html', { root: path.join(__dirname, '../public/views/layouts') });
}

module.exports.home = home;
module.exports.loadPages = loadPages;
module.exports.editPages = editPages;