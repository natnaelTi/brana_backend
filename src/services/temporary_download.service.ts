// import models from "../models/models.js";

// export async function create(temporaryDownload) {
// 	return models.TemporaryDownload.fromJSON(temporaryDownload);
// }

// export async function getAll() {
// 	return models.TemporaryDownload.findAll();
// }
// export async function getOne(id) {
// 	return models.TemporaryDownload.findByPk(id);
// }

// export async function update(id, temporaryDownload) {
// 	const updateTemporaryDownload = await models.TemporaryDownload.findByPk(id);

// 	updateTemporaryDownload.set(temporaryDownload);

// 	await updateTemporaryDownload.save();

// 	return updateTemporaryDownload;
// }

// export async function deleteAll() {
// 	models.TemporaryDownload.destroy({
// 		truncate: true,
// 	});
// }
// export async function deleteOne(id) {
// 	const removedTemporaryDownload = await models.TemporaryDownload.findByPk(id);
// 	removedTemporaryDownload.destroy();
// }
