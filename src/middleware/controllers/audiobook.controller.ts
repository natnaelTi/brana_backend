import * as audiobookService from "../../services/audiobook.service.js";
import { getByAudiobook as getChaptersService } from "../../services/chapter.service.js";
import {
	getRatingsService,
	getPurchasesService,
	getWishlistsService,
	getCartService,
} from "../../services/barrel.audiobook.service.js";

import {
	responseGenerator,
	responseTypes,
	messageTypes,
} from "../../utils/responseGenerator.utils.js";

// CRUD
export async function create(req, res) {
	const resGen = new responseGenerator(res, "audiobook", messageTypes.CREATE);
	try {
		const data = await audiobookService.create(req.body);
		if (!data) {
			return resGen.error(responseTypes.CLIENT_ERROR, "create service error");
		}
		return resGen.data(responseTypes.SUCCESS, data);
	} catch (e) {
		return resGen.error(responseTypes.SERVER_ERROR, e.message);
	}
}
export async function getAll(req, res) {
	const resGen = new responseGenerator(res, "audiobook", messageTypes.GET_ALL);
	try {
		const data = await audiobookService.getAll();
		return resGen.data(responseTypes.SUCCESS, data);
	} catch (e) {
		return resGen.error(responseTypes.SERVER_ERROR, e.message);
	}
}
export async function pages(req, res) {
	const resGen = new responseGenerator(
		res,
		"audiobook",
		messageTypes.GET_PAGES
	);

	// TODO: const items_per_page = req.params.itemsPerPage;

	const items_per_page = 15;
	const page = req.params.page;

	try {
		const data = await audiobookService.getPages(page - 1, items_per_page);

		return resGen.page(
			responseTypes.SUCCESS,
			data.rows,
			data.count,
			items_per_page
		);
	} catch (e) {
		return resGen.error(responseTypes.SERVER_ERROR, e.message);
	}
}

export async function getOne(req, res) {
	const resGen = new responseGenerator(res, "audiobook", messageTypes.GET_ONE);
	try {
		const data = await audiobookService.getOne(req.params.id);
		if (!data) {
			return resGen.error(responseTypes.CLIENT_ERROR, "Audiobook Not Found");
		}
		return resGen.data(responseTypes.SUCCESS, data);
	} catch (e) {
		return resGen.error(responseTypes.SERVER_ERROR, e.message);
	}
}

// TODO: Pagination
// Get audiobook wishlists
export async function getWishlists(req, res) {
	const resGen = new responseGenerator(
		res,
		"audiobook wishlist",
		messageTypes.GET_ALL
	);
	try {
		const id = req.params.id;

		const data = await getWishlistsService(id);
		return resGen.data(responseTypes.SUCCESS, data);
	} catch (err) {
		return resGen.error(responseTypes.SERVER_ERROR, err.message);
	}
}

// Get all audiobook ratings
export async function getRatings(req, res) {
	const resGen = new responseGenerator(
		res,
		"audiobook rating",
		messageTypes.GET_ALL
	);
	try {
		const id = req.params.id;
		const data = await getRatingsService(id);
		return resGen.data(responseTypes.SUCCESS, data);
	} catch (err) {
		return resGen.error(responseTypes.SERVER_ERROR, err.message);
	}
}

// Get all audiobook purchases
export async function getPurchases(req, res) {
	const resGen = new responseGenerator(
		res,
		"audiobook purchase",
		messageTypes.GET_ALL
	);
	try {
		const id = req.params.id;
		const data = await getPurchasesService(id);
		return resGen.data(responseTypes.SUCCESS, data);
	} catch (err) {
		return resGen.error(responseTypes.SERVER_ERROR, err.message);
	}
}

// Get all audiobook cart items
export async function getCartItems(req, res) {
	const resGen = new responseGenerator(
		res,
		"audiobook cart item",
		messageTypes.GET_ALL
	);
	try {
		const id = req.params.id;
		const data = await getCartService(id);
		return resGen.data(responseTypes.SUCCESS, data);
	} catch (err) {
		return resGen.error(responseTypes.SERVER_ERROR, err.message);
	}
}

export async function update(req, res) {
	const resGen = new responseGenerator(res, "audiobook", messageTypes.UPDATE);
	try {
		const data = await audiobookService.update(req.params.id, req.body);
		if (!data) {
			return resGen.error(responseTypes.CLIENT_ERROR, "update service error");
		}
		return resGen.data(responseTypes.SUCCESS, data);
	} catch (e) {
		return resGen.error(responseTypes.SERVER_ERROR, e.message);
	}
}

export async function deleteOne(req, res) {
	// TODO: remove uploaded audiobook, sample, cover
	const resGen = new responseGenerator(res, "audiobook", messageTypes.DELETE);
	try {
		await audiobookService.deleteOne(req.params.id);
		return resGen.simple(responseTypes.SUCCESS);
	} catch (e) {
		return resGen.error(responseTypes.SERVER_ERROR, e.message);
	}
}

// export async function deleteAll(req, res) {
// 	try {
// 		await audiobookService.deleteAll();
// 		return res.status(200).json({
// 			message: responseGenerator.deleteAll("audiobook", true),
// 		});
// 	} catch (e) {
// 		return res.status(400).json({
// 			message: responseGenerator.deleteAll("audiobook", false),
// 			error: e.message,
// 		});
// 	}
// }

export async function search(req, res) {
	const resGen = new responseGenerator(
		res,
		"audiobook search result",
		messageTypes.GET_ALL
	);
	try {
		const data = await audiobookService.search(req.body.query);
		return resGen.data(responseTypes.SUCCESS, data);
	} catch (e) {
		return resGen.error(responseTypes.SERVER_ERROR, e.message);
	}
}

// Chapters
export async function getChapters(req, res) {
	const resGen = new responseGenerator(
		res,
		"audiobook chapter",
		messageTypes.GET_ALL
	);

	try {
		const data = await getChaptersService(req.params.id);
		return resGen.data(responseTypes.SUCCESS, data);
	} catch (e) {
		return resGen.error(responseTypes.SERVER_ERROR, e.message);
	}
}
