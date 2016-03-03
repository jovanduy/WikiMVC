var mongoose = require('mongoose');

// user schema
var userSchema = new mongoose.Schema({
	name:{type:String},
	facebook_id:{type:String}
});

module.exports = mongoose.model('User', userSchema);