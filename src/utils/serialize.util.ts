import passport from "passport";

// Required for getting data from JSON
export default function runSerializer() {
	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser((obj, done) => {
		done(null, obj);
	});
}
