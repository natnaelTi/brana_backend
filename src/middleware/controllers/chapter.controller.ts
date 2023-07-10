import * as chapterService from "../../services/chapter.service.js";
import {
	responseGenerator,
	responseTypes,
	messageTypes,
} from "../../utils/responseGenerator.utils.js";


export async function create(req, res) {
	const resGen = new responseGenerator(res, "chapter", messageTypes.CREATE);
	try {
		const data = await chapterService.create(req.body);
		if (!data) {
			return resGen.error(responseTypes.CLIENT_ERROR, "create service error");
		}
		return resGen.data(responseTypes.SUCCESS, data);
	} catch (e) {
		return resGen.error(responseTypes.SERVER_ERROR, e.message);
	}
}

export async function getAll(req, res) {
	const resGen = new responseGenerator(res, "chapter", messageTypes.GET_ALL);

	try {
		const data = await chapterService.getAll();
		return resGen.data(responseTypes.SUCCESS, data);
	} catch (e) {
		return resGen.error(responseTypes.SERVER_ERROR, e.message);
	}
}
export async function pages(req, res) {
	const resGen = new responseGenerator(res, "chapter", messageTypes.GET_PAGES);

	// TODO: const items_per_page = req.params.itemsPerPage;

	const items_per_page = 15;
	const page = req.params.page;

	try {
		const data = await chapterService.getPages(page - 1, items_per_page);

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
	const resGen = new responseGenerator(res, "chapter", messageTypes.GET_ONE);
	try {
		const data = await chapterService.getOne(req.params.id);
		return resGen.data(responseTypes.SUCCESS, data);
	} catch (e) {
		return resGen.error(responseTypes.SERVER_ERROR, e.message);
	}
}

export async function update(req, res) {
	const resGen = new responseGenerator(res, "chapter", messageTypes.UPDATE);
	try {
		const data = await chapterService.update(req.params.id, req.body);
		if (!data) {
			return resGen.error(responseTypes.CLIENT_ERROR, "update service error");
		}
		return resGen.data(responseTypes.SUCCESS, data);
	} catch (e) {
		return resGen.error(responseTypes.SERVER_ERROR, e.message);
	}
}

export async function deleteOne(req, res) {
	const resGen = new responseGenerator(res, "chapter", messageTypes.DELETE);
	try {
		await chapterService.deleteOne(req.params.id);
		return resGen.simple(responseTypes.SUCCESS);
	} catch (e) {
		return resGen.error(responseTypes.SERVER_ERROR, e.message);
	}
}
