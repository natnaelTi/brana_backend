// import models from "../models/models.js";

// export async function create(wallet) {
// 	return models.Wallet.fromJSON(wallet);
// }

// export async function getAll() {
// 	return models.Wallet.findAll();
// }
// export async function getOne(id) {
// 	return models.Wallet.findByPk(id);
// }

// export async function update(id, wallet) {
// 	const updateWallet = await models.Wallet.findByPk(id);

// 	updateWallet.set(wallet);

// 	await updateWallet.save();

// 	return updateWallet;
// }

// export async function deleteAll() {
// 	models.Wallet.destroy({
// 		truncate: true,
// 	});
// }
// export async function deleteOne(id) {
// 	const removedWallet = await models.Wallet.findByPk(id);
// 	removedWallet.destroy();
// }
