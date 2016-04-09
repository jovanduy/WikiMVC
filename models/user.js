var mongoose = require('mongoose');

// user schema
//why do you use two different syntaxs for defining the types between the two models?
var userSchema = new mongoose.Schema({
	name:{type:String},
	facebook_id:{type:String}
});

module.exports = mongoose.model('User', userSchema);
