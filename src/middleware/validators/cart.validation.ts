import models from "../../models/models.js";

export async function validateCreate(req, res, next) {
	const validationErrors = models.Cart.validation(req.body, false);
	console.log(validationErrors);
	if (validationErrors.length != 0) {
		return res.status(400).json({
			errors: validationErrors,
		});
	}
	next();
}
export async function validateUpdate(req, res, next) {
	const validationErrors = models.Cart.validation(req.body, true);
	console.log(validationErrors);
	if (validationErrors.length != 0) {
		return res.status(400).json({
			errors: validationErrors,
		});
	}
	next();
}

export async function checkID(req, res, next) {
	const cart = await models.Cart.count({
		where: { id: req.params.id },
	});

	if (cart === 0) {
		return res.status(400).json({
			error: "cart item doesn't exist",
		});
	}
	next();
}
