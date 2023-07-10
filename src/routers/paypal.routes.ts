import { Router } from "express";
import passport from "passport";

import * as paypalController from "../middleware/controllers/paypal.controller.js";

const paypalRouter = Router();
paypalRouter.get(
	"/checkout",
	passport.authenticate("jwt", { session: false }),
	paypalController.checkout
);
paypalRouter.post(
	"/checkout/order",
	passport.authenticate("jwt", { session: false }),
	paypalController.order
);

paypalRouter.post(
	"/checkout/capture",
	passport.authenticate("jwt", { session: false }),
	paypalController.capture
);

export { paypalRouter };
