import models from "../../models/models.js";

export async function validateCreate(req, res, next) {
	const validationErrors = models.Genre.validation(req.body, false);
	console.log(validationErrors);
	if (validationErrors.length != 0) {
		return res.status(400).json({
			errors: validationErrors,
		});
	}
	next();
}
export async function validateUpdate(req, res, next) {
	const validationErrors = models.Genre.validation(req.body, true);
	console.log(validationErrors);
	if (validationErrors.length != 0) {
		return res.status(400).json({
			errors: validationErrors,
		});
	}
	next();
}

export async function checkID(req, res, next) {
	const genre = await models.Genre.count({
		where: { id: req.params.id },
	});

	if (genre === 0) {
		return res.status(400).json({
			error: "genre doesn't exist",
		});
	}
	next();
}
