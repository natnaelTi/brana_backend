import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import env from "../config/env.js";
// import models from "../models/models.js";

export default function InitOAuth() {
	const GoogleOAuth = new GoogleStrategy(
		{
			clientID: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			callbackURL: env.GOOGLE_CALLBACK_URL,
			passReqToCallback: true,
		},
		(request, accessToken, refreshToken, profile, done) => {
			console.log("Google AUTH");
			return done(null, profile);
		}
	);

	passport.use(GoogleOAuth);
}
