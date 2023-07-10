import { Router } from "express";

import passport from "passport";
import { AdminRestricted } from "../middleware/auth/roles.auth.js";
import * as genreController from "../middleware/controllers/genre.controller.js";
import * as genreValidation from "../middleware/validators/genre.validation.js";

const genreRouter = Router();

// routes on /api/genres
genreRouter.get("/", genreController.getAll);
genreRouter.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	genreValidation.validateCreate,
	genreController.create
);
genreRouter.get("/pages/:page", genreController.pages);

// routes on /api/genres/:id
genreRouter.get("/:id", genreValidation.checkID, genreController.getOne);

genreRouter.put(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	genreValidation.checkID,
	genreValidation.validateUpdate,
	genreController.update
);

genreRouter.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	genreValidation.checkID,
	genreController.deleteOne
);

export { genreRouter };
