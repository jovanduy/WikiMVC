var Pages = require('../models/pageModel.js');

var home = function(req, res){
	// Set up query to find all page titles ordered by most recently updated
	var pageQuery = Pages.find({}).select('title').sort({timestamp: -1});

	// execute query
	pageQuery.exec(function(err, pageTitles) {
		// return either empty array or page title
		if(err) {
			res.status(500).send('Could not load page information');
		}
		res.render('home', {pageInfo:pageTitles});
	});
};

var login = function(req, res) {
	res.render('login');
}

module.exports.home = home;