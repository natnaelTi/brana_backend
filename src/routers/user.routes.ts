import { Router } from "express";
import passport from "passport";

import * as userController from "../middleware/controllers/user.controller.js";
import * as userValidation from "../middleware/validators/user.validation.js";
const userRouter = Router();

// Admin view users
// userRouter.get("/", userController.getAll);
// userRouter.get("/pages/:page", userController.pages);

// get  profile
userRouter.get("/:id", userValidation.checkID, userController.getProfile);
userRouter.get(
	"/:id/ratings",
	userValidation.checkID,
	userController.getRatings
);
userRouter.get(
	"/:id/wishlists",
	userValidation.checkID,
	userController.getWishlists
);

// Admin or User only
userRouter.get(
	"/:id/purchases",
	userValidation.checkID,
	userController.getPurchases
);
userRouter.get(
	"/:id/cart",
	userValidation.checkID,
	userController.getCartItems
);

export { userRouter };
