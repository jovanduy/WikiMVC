var Page = require('../models/pageModel.js');
var path = require('path');

var routes = {};

routes.add = function (req, res) {
    var page = req.body;
    var newPage = new Page(page);
    newPage.save(function (err) {
        if (err) res.status(500).send('Error adding new page');
    });
    res.send(newPage);
};

routes.edit = function (req, res) {
    var page = req.body;
    Page.findByIdAndUpdate(page.id, {content: page.content, timeStamp: Date(), userLastEdited: page.user}, {new: true}, function (err, page) {
        if (err) res.status(500).send('Error updating page');
        res.send(page);
    });
};

routes.delete = function (req, res) {
    Page.remove({_id: req.params.id}, function (err) {
        if (err) res.status(500).send('Error deleting page');
    });
    res.end();
};

routes.getPage = function (req, res) {
    Page.findById(req.params.id, function (err, page) {
        if (err) res.status(500).send('Error finding page');
        res.sendFile('main.html', { root: path.join(__dirname, '../public/views/layouts') });
    });
}

module.exports = routes;