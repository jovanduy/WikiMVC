var Page = require('../models/pageModel.js');

routes = {};

routes.add = function (req, res) {
    var page = req.body;
    var newPage = new Page(page);
    newPage.save(function (err) {
        if (err) res.status(500).send('Problem adding new page');
    });
    res.end();
};

routes.edit = function (req, res) {
    var page = req.body;
    Page.findByIdAndUpdate(page.id, {content: page.content, timeStamp: Date(), userLastEdited: page.user}, function (err, ingredient) {
        if (err) res.status(500).send('Error updating page');
        res.end();
    });
};

routes.delete = function (req, res) {
    
};

module.exports = routes;