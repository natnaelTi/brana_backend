import models from "../models/models.js";
import {
	createGen,
	getAllGen,
	getPaginatedGen,
	getOneGen,
	updateGen,
	deleteOneGen,
} from "../utils/ServiceGenerator.util.js";

// CRUD
export const create = createGen(models.User);
export const getAll = getAllGen(models.User);
export const getPages = getPaginatedGen(models.User);
export const getOne = getOneGen(models.User);
export const update = updateGen(models.User);
export const deleteOne = deleteOneGen(models.User);

// Specialized

export function getProfile(id: Number) {
	return models.User.findByPk(id, { include: models.UserAudiobookProfile });
}
