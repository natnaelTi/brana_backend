import { Router } from "express";
import passport from "passport";
import { AdminRestricted } from "../middleware/auth/roles.auth.js";
import * as audiobookController from "../middleware/controllers/audiobook.controller.js";
import * as audiobookValidation from "../middleware/validators/audiobook.validation.js";

import * as cloudController from "../middleware/controllers/cloud.controller.js";
const audiobookRouter = Router();

// Routes for anonymous users
audiobookRouter.get("/", audiobookController.getAll);
audiobookRouter.get("/pages/:page", audiobookController.pages);
audiobookRouter.get(
	"/:id",
	audiobookValidation.checkID,
	audiobookController.getOne
);
audiobookRouter.get(
	"/:id/ratings",
	audiobookValidation.checkID,
	audiobookController.getRatings
);
audiobookRouter.get(
	"/:id/wishlists",
	audiobookValidation.checkID,
	audiobookController.getWishlists
);

// Admin only
audiobookRouter.get(
	"/:id/purchases",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	audiobookValidation.checkID,
	audiobookController.getPurchases
);
audiobookRouter.get(
	"/:id/cart",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	audiobookValidation.checkID,
	audiobookController.getCartItems
);
audiobookRouter.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	audiobookValidation.validateCreate,
	audiobookController.create
);

audiobookRouter.put(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	audiobookValidation.checkID,
	audiobookValidation.validateUpdate,
	audiobookController.update
);
audiobookRouter.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	audiobookValidation.checkID,
	audiobookController.deleteOne
);

// File management
// Upload Audiobook
audiobookRouter.post(
	"/:id/upload/:chapter",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	cloudController.uploadFromAudiobook
);
audiobookRouter.post(
	"/:id/sample",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	cloudController.uploadSample
);
audiobookRouter.post(
	"/:id/cover",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	cloudController.uploadCover
);

audiobookRouter.post("/:id/download", cloudController.download);
audiobookRouter.post("/:id/stream/:chapter", cloudController.stream);

// Chapters
audiobookRouter.get(
	"/:id/chapters",
	passport.authenticate("jwt", { session: false }),
	audiobookController.getChapters
);

export { audiobookRouter };
