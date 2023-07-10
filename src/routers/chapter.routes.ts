import { Router } from "express";
import passport from "passport";

import { AdminRestricted } from "../middleware/auth/roles.auth.js";
import * as chapterController from "../middleware/controllers/chapter.controller.js";
import * as chapterValidation from "../middleware/validators/chapter.validation.js";
import { uploadFromChapter } from "../middleware/controllers/cloud.controller.js";
const chapterRouter = Router();

// routes on /api/chapters
chapterRouter.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	chapterController.getAll
);

chapterRouter.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	chapterValidation.validateCreate,
	chapterController.create
);
chapterRouter.get(
	"/pages/:page",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	chapterController.pages
);

// routes on /api/chapter/:id
chapterRouter.get(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	chapterController.getOne
);

chapterRouter.put(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	chapterValidation.checkID,
	chapterValidation.validateUpdate,
	chapterController.update
);

chapterRouter.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	chapterValidation.checkID,
	AdminRestricted,
	chapterController.deleteOne
);
chapterRouter.post(
	"/:id/upload",
	passport.authenticate("jwt", { session: false }),
	AdminRestricted,
	uploadFromChapter
);
export { chapterRouter };
