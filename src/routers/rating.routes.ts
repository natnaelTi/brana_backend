import { Router } from "express";
import passport from "passport";

import { AdminRestricted } from "../middleware/auth/roles.auth.js";
import * as ratingController from "../middleware/controllers/rating.controller.js";
import * as ratingValidation from "../middleware/validators/rating.validation.js";

const ratingRouter = Router();

// routes on /api/genres
ratingRouter.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	ratingController.getAll
);

ratingRouter.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	ratingController.UserCreateRestricted,
	ratingValidation.validateCreate,
	ratingController.create
);
ratingRouter.get(
	"/pages/:page",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	ratingController.pages
);

// routes on /api/genres/:id
ratingRouter.get("/:id", ratingController.getOne);

ratingRouter.put(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	ratingController.UserModifyRestricted,
	ratingValidation.checkID,
	ratingValidation.validateUpdate,
	ratingController.update
);

ratingRouter.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	ratingValidation.checkID,
	ratingController.UserModifyRestricted,
	ratingController.deleteOne
);

export { ratingRouter };
