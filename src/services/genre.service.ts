import models from "../models/models.js";
import {
	createGen,
	getAllGen,
	getPaginatedGen,
	getOneGen,
	updateGen,
	deleteOneGen,
} from "../utils/ServiceGenerator.util.js";

export const create = createGen(models.Genre);
export const getAll = getAllGen(models.Genre);
export const getPages = getPaginatedGen(models.Genre);
export const getOne = getOneGen(models.Genre);
export const update = updateGen(models.Genre);
export const deleteOne = deleteOneGen(models.Genre);
