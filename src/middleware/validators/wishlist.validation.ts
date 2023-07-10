import models from "../../models/models.js";

export async function validateCreate(req, res, next) {
	const validationErrors = models.Wishlist.validation(req.body, false);
	console.log(validationErrors);
	if (validationErrors.length != 0) {
		return res.status(400).json({
			errors: validationErrors,
		});
	}
	next();
}

export async function checkID(req, res, next) {
	const wishlist = await models.Wishlist.count({
		where: { id: req.params.id },
	});

	if (wishlist === 0) {
		return res.status(400).json({
			error: "wishlist doesn't exist",
		});
	}
	next();
}
