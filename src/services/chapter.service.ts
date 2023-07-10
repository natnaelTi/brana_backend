import models from "../models/models.js";

import {
	createGen,
	getAllGen,
	getPaginatedGen,
	getOneGen,
	updateGen,
	deleteOneGen,
	getByAudiobookGen,
} from "../utils/ServiceGenerator.util.js";

// CRUD
export const create = createGen(models.Chapter);
export const getAll = getAllGen(models.Chapter);
export const getPages = getPaginatedGen(models.Chapter);
export const getOne = getOneGen(models.Chapter);
export const update = updateGen(models.Chapter);
export const deleteOne = deleteOneGen(models.Chapter);

export const getByAudiobook = getByAudiobookGen(models.Chapter);

export async function getByAudiobookAndNumber(id: Number, number: Number) {
	let chapter = await models.Chapter.findAll({
		where: {
			audiobook_id: id,
			number: number,
		},
	});
	return chapter[0];
}
