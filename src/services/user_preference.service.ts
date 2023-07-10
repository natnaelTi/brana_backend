import models from "../models/models.js";

export async function create(userPreference) {
	return models.UserPreference.fromJSON(userPreference);
}

export async function getAll() {
	return models.UserPreference.findAll();
}
export async function getOne(id) {
	return models.UserPreference.findByPk(id);
}

export async function update(id, userPreference) {
	const updateUserPreference = await models.UserPreference.findByPk(id);

	updateUserPreference.set(userPreference);

	await updateUserPreference.save();

	return updateUserPreference;
}

export async function deleteAll() {
	models.UserPreference.destroy({
		truncate: true,
	});
}
export async function deleteOne(id) {
	const removedUserPreference = await models.UserPreference.findByPk(id);
	removedUserPreference.destroy();
}
