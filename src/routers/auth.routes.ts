import { Router } from "express";
import passport from "passport";

import * as authController from "../middleware/controllers/auth.controller.js";
import * as userValidation from "../middleware/validators/user.validation.js";

const authRouter = Router();

// auth routes
authRouter.post("/signin", authController.login);
authRouter.post(
	"/signup",
	userValidation.validateCreate,
	authController.register
);
// userRouter.get("/logout"); // TODO research possible methods of invalidating token

// oauth routes
authRouter.get(
	"/oauth/google/",
	passport.authenticate("google", { scope: ["email", "profile"] })
);
authRouter.get(
	"/oauth/google/redirect",
	passport.authenticate("google", {
		session: false,
	}),
	authController.OAuth
);

export { authRouter };
