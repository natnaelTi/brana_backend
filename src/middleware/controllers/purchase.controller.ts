import * as purchaseService from "../../services/purchase.service.js";
import {
	responseGenerator,
	responseTypes,
	messageTypes,
} from "../../utils/responseGenerator.utils.js";

// Check if creating user is the right user
export async function UserCreateRestricted(req, res, next) {
	if (
		req.user.dataValues.type == 1 ||
		req.body.user_id == req.user.dataValues.id
	) {
		next();
	} else {
		return res.status(401).json({
			message: "UNAUTHORIZED",
			error: "User cannot create a resource for another user!",
		});
	}
}

// Check if accessing user is the right user
export async function UserModifyRestricted(req, res, next) {
	try {
		const checkUserID = await purchaseService.modifyAuth(
			req.params.id,
			req.user.dataValues.id
		);
		if (req.user.dataValues.type == 1 || checkUserID) {
			next();
		} else {
			return res.status(401).json({
				message: "UNAUTHORIZED",
				error: "User cannot modify a resource for another user!",
			});
		}
	} catch (e) {}
}

export async function create(req, res) {
	const resGen = new responseGenerator(res, "purchase", messageTypes.CREATE);

	try {
		const data = await purchaseService.create(req.body);
		if (!data) {
			return resGen.error(responseTypes.CLIENT_ERROR, "create service error");
		}
		return resGen.data(responseTypes.SUCCESS, data);
	} catch (e) {
		return resGen.error(responseTypes.SERVER_ERROR, e.message);
	}
}
export async function getAll(req, res) {
	const resGen = new responseGenerator(res, "purchase", messageTypes.GET_ALL);

	try {
		const data = await purchaseService.getAll();
		return resGen.data(responseTypes.SUCCESS, data);
	} catch (e) {
		return resGen.error(responseTypes.SERVER_ERROR, e.message);
	}
}

export async function pages(req, res) {
	const resGen = new responseGenerator(res, "purchase", messageTypes.GET_PAGES);

	// TODO: const items_per_page = req.params.itemsPerPage;

	const items_per_page = 15;
	const page = req.params.page;

	try {
		const data = await purchaseService.getPages(page - 1, items_per_page);

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
	const resGen = new responseGenerator(res, "purchase", messageTypes.GET_ONE);
	try {
		const data = await purchaseService.getOne(req.params.id);
		return resGen.data(responseTypes.SUCCESS, data);
	} catch (e) {
		return resGen.error(responseTypes.SERVER_ERROR, e.message);
	}
}

export async function deleteOne(req, res) {
	const resGen = new responseGenerator(res, "purchase", messageTypes.DELETE);
	try {
		await purchaseService.deleteOne(req.params.id);
		return resGen.simple(responseTypes.SUCCESS);
	} catch (e) {
		return resGen.error(responseTypes.SERVER_ERROR, e.message);
	}
}
