import models from "../models/models.js";

import {
	createGen,
	getAllGen,
	getPaginatedGen,
	getOneGen,
	updateGen,
	deleteOneGen,
	getByUserGen,
	getByAudiobookGen,
	modifyAuthGen,
	deleteByUserGen,
} from "../utils/ServiceGenerator.util.js";

// CRUD
export const create = createGen(models.Rating);
export const getAll = getAllGen(models.Rating);
export const getPages = getPaginatedGen(models.Rating);
export const getOne = getOneGen(models.Rating);
export const update = updateGen(models.Rating);
export const deleteOne = deleteOneGen(models.Rating);

export const getByUser = getByUserGen(models.Rating);
export const getByAudiobook = getByAudiobookGen(models.Rating);
export const modifyAuth = modifyAuthGen(models.Rating);
export const deleteByUser = deleteByUserGen(models.Rating);
