import * as userService from "./user.service.js";
import models from "../models/models.js";
import jwt from "jsonwebtoken";
import env from "../config/env.js";

export async function login(data) {
	const user = await models.User.findByEmail(data.email, "withPassword");
	if (!user) return;
	if (!models.User.checkPassword(data.password, user.password)) return;

	return jwt.sign(
		{
			id: user.id,
		},
		env.SECRET_KEY,
		{
			expiresIn: "7d",
		}
	);
}

export async function oAuth(data) {
	const user = await models.User.findByEmail(data.email, "withPassword");
	if (!user) {
		const newUser = await userService.create({
			first_name: data.name.givenName,
			last_name: data.name.familyName,
			email: data._json.email,
			password: Math.random().toString(36).slice(-10),
		});
		return jwt.sign(
			{
				id: newUser.id,
			},
			env.SECRET_KEY,
			{
				expiresIn: "7d",
			}
		);
	}

	return jwt.sign(
		{
			id: user.id,
		},
		env.SECRET_KEY,
		{
			expiresIn: "7d",
		}
	);
}
