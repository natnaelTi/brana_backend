import models from "../models/models.js";

export async function create(userAudiobookProfile) {
	return models.UserAudiobookProfile.fromJSON(userAudiobookProfile);
}

export async function getAll() {
	return models.UserAudiobookProfile.findAll();
}
export async function getOne(id) {
	return models.UserAudiobookProfile.findByPk(id);
}

export async function update(id, userAudiobookProfile) {
	const updateUserAudiobookProfile = await models.UserAudiobookProfile.findByPk(id);

	updateUserAudiobookProfile.set(userAudiobookProfile);

	await updateUserAudiobookProfile.save();

	return updateUserAudiobookProfile;
}

export async function deleteAll() {
	models.UserAudiobookProfile.destroy({
		truncate: true,
	});
}
export async function deleteOne(id) {
	const removedUserAudiobookProfile = await models.UserAudiobookProfile.findByPk(id);
	removedUserAudiobookProfile.destroy();
}
