var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user.js');
var credentials = require('./credentials.js');

module.exports = function(passport) {
	passport.use(new FacebookStrategy({
		clientID:process.env.SIEGEL_FACEBOOK_CLIENT_ID || credentials.CLIENT_ID,
		clientSecret:process.env.SIEGEL_FACEBOOK_CLIENT_SECRET || credentials.CLIENT_SECRET,
		callbackURL:process.env.SIEGEL_FACEBOOK_CALLBACK_URL || credentials.CALLBACK_URL
	}, function(accessToken, refreshToken, profile, done) {
		User.findOne({facebook_id:profile.id}, function(err, user) {
			if(err) {
				return done(err);
			} else {
				if(!user) {
					newUser = new User({
						name:profile.displayName,
						facebook_id:profile.id
					});

					newUser.save(function(err, user) {
						if(err) {
							return done(err);
						} else {
							return done(null, user);
						}
					});
				} else {
					return done(null, user);
				}
			}
		});
	}));
};