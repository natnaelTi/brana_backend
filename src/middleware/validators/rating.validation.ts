import models from "../../models/models.js";

export async function validateCreate(req, res, next) {
	const validationErrors = models.Rating.validation(req.body, false);
	console.log(validationErrors);
	if (validationErrors.length != 0) {
		return res.status(400).json({
			errors: validationErrors,
		});
	}
	next();
}
export async function validateUpdate(req, res, next) {
	const validationErrors = models.Rating.validation(req.body, true);
	console.log(validationErrors);
	if (validationErrors.length != 0) {
		return res.status(400).json({
			errors: validationErrors,
		});
	}
	next();
}

export async function checkID(req, res, next) {
	const rating = await models.Rating.count({
		where: { id: req.params.id },
	});

	if (rating === 0) {
		return res.status(400).json({
			error: "rating doesn't exist",
		});
	}
	next();
}
