import { Router } from "express";
import passport from "passport";

import * as userController from "../middleware/controllers/user.controller.js";

const accountRouter = Router();

// account routes
accountRouter.get(
	"/profile",
	passport.authenticate("jwt", { session: false }),
	userController.getProfile
);
accountRouter.get(
	"/ratings",
	passport.authenticate("jwt", { session: false }),
	userController.getRatings
);
accountRouter.get(
	"/wishlists",
	passport.authenticate("jwt", { session: false }),
	userController.getWishlists
);
accountRouter.get(
	"/purchases",
	passport.authenticate("jwt", { session: false }),
	userController.getPurchases
);
accountRouter.get(
	"/cart",
	passport.authenticate("jwt", { session: false }),
	userController.getCartItems
);

export { accountRouter };
