var Page = require('../models/pageModel.js');

var routes = {};

routes.add = function (req, res) {
    var page = req.body;
    var newPage = new Page(page);
    newPage.save(function (err) {
        if (err) res.status(500).send('Problem adding new page');
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
    Page.remove({_id: req.body.id}, function (err) {
        res.status(500).send('Error deleting page');
    });
    res.end();
};

module.exports = routes;