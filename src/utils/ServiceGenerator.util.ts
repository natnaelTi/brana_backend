import models from "../models/models.js";
// TODO: create a separate service generator for non-json functions using types
type IncludeTypes = {
	user?: boolean;
	audiobook?: boolean;
};

type options = {
	scope?: string;
	including?: IncludeTypes;
};

const defaultOptions: options = {
	scope: "defaultScope",
	including: {
		user: false,
		audiobook: false,
	},
};

function checkIncludes(including: IncludeTypes) {
	const includes = [];
	if (including.user) {
		includes.push(models.User);
	}

	if (including.audiobook) {
		includes.push(models.Audiobook);
	}

	return includes;
}

export function createGen(model) {
	return async (json) => {
		return model.fromJSON(json);
	};
}

export function getAllGen(model, options: options = defaultOptions) {
	return async () => {
		return model.scope(options.scope).findAll({
			include: checkIncludes(options.including),
		});
	};
}

export function getPaginatedGen(model, options: options = defaultOptions) {
	return async (page, length) => {
		return model.scope(options.scope).findAndCountAll({
			limit: length ? length : 3,
			offset: page ? page * length : 0,
			include: checkIncludes(options.including),
		});
	};
}

export function getOneGen(model, options: options = defaultOptions) {
	return async (id) => {
		return model.scope(options.scope).findByPk(id, {
			include: checkIncludes(options.including),
		});
	};
}

export function updateGen(model) {
	return async (id, json) => {
		const instance = await model.findByPk(id);

		instance.set(json);

		await instance.save();

		return instance;
	};
}

export function deleteOneGen(model) {
	return async (id) => {
		const instance = await model.findByPk(id);
		instance.destroy();
	};
}
export function deleteAllGen(model) {
	return async () => {
		model.delete({
			truncate: true,
		});
	};
}

// Specialized
export function getByUserGen(model) {
	return async (userID: Number, options: options = defaultOptions) => {
		return model.scope(options.scope).findAll({
			where: {
				user_id: userID,
			},
			include: checkIncludes(options.including),
		});
	};
}
export function getByAudiobookGen(model) {
	return async (audiobookID: Number, options: options = defaultOptions) => {
		return model.findAll({
			where: {
				audiobook_id: audiobookID,
			},
			include: checkIncludes(options.including),
		});
	};
}

export function deleteByUserGen(model) {
	return async (userID) => {
		model.destroy({
			where: {
				user_id: userID,
			},
		});
	};
}

export function modifyAuthGen(model) {
	return async (ratingID: Number, userID: Number) => {
		const instance = await model.findByPk(ratingID);
		return instance.user_id == userID;
	};
}
