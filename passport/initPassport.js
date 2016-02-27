var facebook = require('./facebook.js');

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

	facebook(passport);
};