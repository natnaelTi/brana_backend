import { Op } from "sequelize";
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
export const create = createGen(models.Audiobook);
export const getAll = getAllGen(models.Audiobook);
export const getPages = getPaginatedGen(models.Audiobook);
export const getOne = getOneGen(models.Audiobook);
export const update = updateGen(models.Audiobook);
export const deleteOne = deleteOneGen(models.Audiobook);

// Specialized
// TODO: full text search
// TODO: paginate search
export async function search(query) {
	const audiobooks = await models.Audiobook.findAll({
		limit: 10,
		where: {
			[Op.or]: [
				{
					title: {
						[Op.like]: "%" + query + "%",
					},
				},
				{
					author: {
						[Op.like]: "%" + query + "%",
					},
				},
				{
					narrator: {
						[Op.like]: "%" + query + "%",
					},
				},
			],
		},
	});
	return audiobooks;
}


