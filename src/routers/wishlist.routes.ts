import { Router } from "express";

import passport from "passport";
import { AdminRestricted } from "../middleware/auth/roles.auth.js";

import * as wishlistController from "../middleware/controllers/wishlist.controller.js";
import * as wishlistValidation from "../middleware/validators/wishlist.validation.js";

const wishlistRouter = Router();


// routes on /api/genres
wishlistRouter.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	wishlistController.getAll
);
wishlistRouter.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	wishlistController.UserCreateRestricted,
	wishlistValidation.validateCreate,
	wishlistController.create
);
wishlistRouter.get(
	"/pages/:page",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	wishlistController.pages
);

// routes on /api/genres/:id
wishlistRouter.get(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	wishlistController.UserModifyRestricted,
	wishlistController.getOne
);

wishlistRouter.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	wishlistValidation.checkID,
	wishlistController.UserModifyRestricted,
	wishlistController.deleteOne
);

export { wishlistRouter };
