import models from "../models/models.js";
import {
	createGen,
	getAllGen,
	getPaginatedGen,
	getOneGen,
	updateGen,
	deleteOneGen,
	getByUserGen,
	modifyAuthGen,
	getByAudiobookGen,
	deleteByUserGen,
} from "../utils/ServiceGenerator.util.js";

// CRUD
export const create = createGen(models.Cart);
export const getAll = getAllGen(models.Cart);
export const getPages = getPaginatedGen(models.Cart);
export const getOne = getOneGen(models.Cart);
export const update = updateGen(models.Cart);
export const deleteOne = deleteOneGen(models.Cart);

// Specialized
export const getByUser = getByUserGen(models.Cart);
export const getByAudiobook = getByAudiobookGen(models.Cart);
export const modifyAuth = modifyAuthGen(models.Cart);
export const deleteByUser = deleteByUserGen(models.Cart);

