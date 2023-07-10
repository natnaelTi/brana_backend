import models from "../../models/models.js";

export async function validateCreate(req, res, next) {
	const validationErrors = models.Audiobook.validation(req.body, false);
	console.log(validationErrors);
	if (validationErrors.length != 0) {
		return res.status(400).json({
			errors: validationErrors,
		});
	}
	next();
}
export async function validateUpdate(req, res, next) {
	const validationErrors = models.Audiobook.validation(req.body, true);
	console.log(validationErrors);
	if (validationErrors.length != 0) {
		return res.status(400).json({
			errors: validationErrors,
		});
	}
	next();
}

export async function checkID(req, res, next) {
	const audiobook = await models.Audiobook.count({
		where: { id: req.params.id },
	});

	if (audiobook === 0) {
		return res.status(400).json({
			error: "audiobook doesn't exist",
		});
	}
	next();
}
