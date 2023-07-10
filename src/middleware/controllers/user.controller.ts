import * as userService from "../../services/user.service.js";

import {
	getRatingsService,
	getPurchasesService,
	getWishlistsService,
	getCartService,
} from "../../services/barrel.user.service.js";

import {
	responseGenerator,
	responseTypes,
	messageTypes,
} from "../../utils/responseGenerator.utils.js";

// TODO: Pagination
// TODO: Authorize user
// Get user data + audiobook profile
export async function getProfile(req, res) {
	const resGen = new responseGenerator(
		res,
		"user profile",
		messageTypes.GET_ONE
	);
	try {
		let id: number;

		// So that function can be used on both /user/:id and /account/...
		if (req.user) {
			id = req.user.dataValues.id;
		} else {
			id = req.params.id;
		}

		const data = await userService.getProfile(id);

		return resGen.data(responseTypes.SUCCESS, data);
	} catch (e) {
		return resGen.error(responseTypes.SERVER_ERROR, e.message);
	}
}

// Get user wishlists
export async function getWishlists(req, res) {
	const resGen = new responseGenerator(
		res,
		"user wishlist",
		messageTypes.GET_ALL
	);
	try {
		let id: number;

		// So that function can be used on both /user/:id and /account/...
		if (req.user) {
			id = req.user.dataValues.id;
		} else {
			id = req.params.id;
		}
		const data = await getWishlistsService(id);
		return resGen.data(responseTypes.SUCCESS, data);
	} catch (err) {
		return resGen.error(responseTypes.SERVER_ERROR, err.message);
	}
}

// Get all user ratings
export async function getRatings(req, res) {
	const resGen = new responseGenerator(
		res,
		"user rating",
		messageTypes.GET_ALL
	);
	try {
		let id: number;

		// So that function can be used on both /user/:id and /account/...
		if (req.user) {
			id = req.user.dataValues.id;
		} else {
			id = req.params.id;
		}
		const data = await getRatingsService(id);
		return resGen.data(responseTypes.SUCCESS, data);
	} catch (err) {
		return resGen.error(responseTypes.SERVER_ERROR, err.message);
	}
}

// // Get all user purchases
export async function getPurchases(req, res) {
	const resGen = new responseGenerator(
		res,
		"user purchase",
		messageTypes.GET_ALL
	);
	try {
		let id: number;

		// So that function can be used on both /user/:id and /account/...
		if (req.user) {
			id = req.user.dataValues.id;
		} else {
			id = req.params.id;
		}
		const data = await getPurchasesService(id);
		return resGen.data(responseTypes.SUCCESS, data);
	} catch (err) {
		return resGen.error(responseTypes.SERVER_ERROR, err.message);
	}
}
// TODO: make sure the id is found
// // Get all user cart items
export async function getCartItems(req, res) {
	const resGen = new responseGenerator(
		res,
		"user cart item",
		messageTypes.GET_ALL
	);
	try {
		let id: number;

		// So that function can be used on both /user/:id and /account/...
		if (req.user) {
			id = req.user.dataValues.id;
		} else {
			id = req.params.id;
		}
		const data = await getCartService(id);
		return resGen.data(responseTypes.SUCCESS, data);
	} catch (err) {
		return resGen.error(responseTypes.SERVER_ERROR, err.message);
	}
}

//
