import passport from "passport";
import { Strategy as JWTStrategy } from "passport-jwt";
import env from "../config/env.js";
import models from "../models/models.js";

export default function InitJWT() {
	const opts = {
		jwtFromRequest: (req) => {
			return req.body.token || req.query.token || req.headers["x-access-token"];
		},
		secretOrKey: env.SECRET_KEY,
	};

	const jwtStrategy = new JWTStrategy(opts, async (payload, done) => {
		console.log("JWT AUTH");
		try {
			const user = await models.User.findByPk(payload.id);

			if (!user) {
				return done(null, false);
			}
			return done(null, user);
		} catch (err) {
			return done(err, false);
		}
	});

	passport.use(jwtStrategy);
}
