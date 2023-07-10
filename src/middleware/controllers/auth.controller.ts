import * as authService from "../../services/auth.service.js";
import * as userService from "../../services/user.service.js";

import {
	responseGenerator,
	responseTypes,
	messageTypes,
} from "../../utils/responseGenerator.utils.js";

export async function login(req, res) {
	const resGen = new responseGenerator(res, "Login", messageTypes.OPERATION);
	try {
		const token = await authService.login(req.body);

		if (token) {
			return resGen.data(responseTypes.SUCCESS, token, "token");
		} else {
			return resGen.error(
				responseTypes.CLIENT_ERROR,
				"Login credentials invalid"
			);
		}
	} catch (err) {
		return resGen.error(responseTypes.SERVER_ERROR, err.message);
	}
}

export async function register(req, res) {
	const resGen = new responseGenerator(
		res,
		"Registration",
		messageTypes.OPERATION
	);
	try {
		const user = await userService.create(req.body);
		if (user) {
			return resGen.simple(responseTypes.SUCCESS);
		} else {
			return resGen.error(responseTypes.CLIENT_ERROR, "Unable to create user");
		}
	} catch (err) {
		return resGen.error(responseTypes.SERVER_ERROR, err.message);
	}
}

export async function OAuth(req, res) {
	const resGen = new responseGenerator(
		res,
		"OAuth",
		messageTypes.OPERATION
	);
	try {
		console.log("redirected", req.user);

		const token = await authService.oAuth(req.user);
		if (token) {
			return resGen.data(responseTypes.SUCCESS, token, "token");
		} else {
			return resGen.error(responseTypes.CLIENT_ERROR, "Unable to create user");
		}
	} catch (error) {
		return resGen.error(responseTypes.SERVER_ERROR, error.message);
	}
}
