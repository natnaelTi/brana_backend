import { Router } from "express";
import passport from "passport";
import { AdminRestricted } from "../middleware/auth/roles.auth.js";

import * as purchaseController from "../middleware/controllers/purchase.controller.js";
import * as purchaseValidation from "../middleware/validators/purchase.validation.js";

const purchaseRouter = Router();

// routes on /api/genres
purchaseRouter.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	purchaseController.getAll
);

// purchaseRouter.post(
// 	"/",
// 	passport.authenticate("jwt", { session: false }),
// 	purchaseController.UserCreateRestricted,
// 	purchaseValidation.validateCreate,
// 	purchaseController.create
// );
purchaseRouter.get(
	"/pages/:page",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	purchaseController.pages
);

// routes on /api/genres/:id
purchaseRouter.get(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	purchaseController.UserModifyRestricted,
	purchaseController.getOne
);

purchaseRouter.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	purchaseValidation.checkID,
	purchaseController.UserModifyRestricted,
	purchaseController.deleteOne
);

export { purchaseRouter };
