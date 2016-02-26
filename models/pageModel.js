var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    title: String,
    content: String,
    timestamp: Date,
    userCreated: String,
    userLastEdited: String
});

module.exports = mongoose.model("Page", pageSchema);
