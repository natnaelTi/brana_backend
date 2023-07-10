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
export const create = createGen(models.Wishlist);
export const getAll = getAllGen(models.Wishlist);
export const getPages = getPaginatedGen(models.Wishlist);
export const getOne = getOneGen(models.Wishlist);
export const update = updateGen(models.Wishlist);
export const deleteOne = deleteOneGen(models.Wishlist);

// Specialized
export const getByUser = getByUserGen(models.Wishlist);
export const getByAudiobook = getByAudiobookGen(models.Wishlist);
export const modifyAuth = modifyAuthGen(models.Wishlist);
export const deleteByUser = deleteByUserGen(models.Wishlist);
