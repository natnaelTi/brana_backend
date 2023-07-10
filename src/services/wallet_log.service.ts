// import models from "../models/models.js";

// export async function create(walletLog) {
// 	return models.WalletLog.fromJSON(walletLog);
// }

// export async function getAll() {
// 	return models.WalletLog.findAll();
// }
// export async function getOne(id) {
// 	return models.WalletLog.findByPk(id);
// }

// export async function update(id, walletLog) {
// 	const updateWalletLog = await models.WalletLog.findByPk(id);

// 	updateWalletLog.set(walletLog);

// 	await updateWalletLog.save();

// 	return updateWalletLog;
// }

// export async function deleteAll() {
// 	models.WalletLog.destroy({
// 		truncate: true,
// 	});
// }
// export async function deleteOne(id) {
// 	const removedWalletLog = await models.WalletLog.findByPk(id);
// 	removedWalletLog.destroy();
// }
