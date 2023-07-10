import { Router } from "express";
import passport from "passport";
import { AdminRestricted } from "../middleware/auth/roles.auth.js";

import * as cartController from "../middleware/controllers/cart.controller.js";
import * as cartValidation from "../middleware/validators/cart.validation.js";

const cartRouter = Router();

// routes on /api/genres
cartRouter.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	cartController.getAll
);

cartRouter.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	cartController.UserCreateRestricted,
	cartValidation.validateCreate,
	cartController.create
);
cartRouter.get(
	"/pages/:page",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	cartController.pages
);

// routes on /api/genres/:id
cartRouter.get(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	cartController.UserModifyRestricted,
	cartController.getOne
);

cartRouter.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	cartValidation.checkID,
	cartController.UserModifyRestricted,
	cartController.deleteOne
);

export { cartRouter };
