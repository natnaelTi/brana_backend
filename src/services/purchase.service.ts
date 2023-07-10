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
} from "../utils/ServiceGenerator.util.js";

// CRUD
export const create = createGen(models.Purchase);
export const getAll = getAllGen(models.Purchase);
export const getPages = getPaginatedGen(models.Purchase);
export const getOne = getOneGen(models.Purchase);
export const update = updateGen(models.Purchase);
export const deleteOne = deleteOneGen(models.Purchase);

// Specialized
export const getByUser = getByUserGen(models.Purchase);
export const getByAudiobook = getByAudiobookGen(models.Purchase);
export const modifyAuth = modifyAuthGen(models.Purchase);

export const createPurchaseFromCart = async (userID) => {
	const purchases = [];
	const cart = models.Cart.findAll({
		where: {
			user_id: userID,
		},
		include: [models.Audiobook],
	});

	cart.forEach((cartItem) => {
		purchases.push({
			user_id: userID,
			audiobook_id: cartItem.dataValues.audiobook.id,
			price: cartItem.dataValues.audiobook.price,
		});
	});
	
};
