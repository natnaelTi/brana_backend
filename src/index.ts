import express from "express";
import bodyParser from "body-parser";
import passport from "passport";

import env from "./config/env.js";
import * as logger from "./utils/logger.utils.js";
import * as routers from "./routers/routes.js";
import setupPassport from "./utils/auth.utils.js";
import path from "path";
import { fileURLToPath } from "url";
const app = express();

app.set("view engine", "ejs");
app.set(
	"views",
	path.join(path.dirname(fileURLToPath(import.meta.url)), "/views")
);

// Add body parser
app.use((req, res, next) => {
	bodyParser.json({
		verify: addRawBody,
	})(req, res, (err) => {
		if (err) {
			console.log("bodyParser", err);
			res.sendStatus(400);
			return;
		}
		next();
	});
});

function addRawBody(req, res, buf, encoding) {
	req.rawBody = buf.toString();
}

app.use(passport.initialize());

// Setup Passport Authentication
setupPassport();

const apiPrefix = "/api";

// Routes
app.use(`${apiPrefix}`, routers.authRouter);
app.use(`${apiPrefix}/account`, routers.accountRouter);
app.use(`${apiPrefix}/audiobooks`, routers.audiobookRouter);
app.use(`${apiPrefix}/cart`, routers.cartRouter);
app.use(`${apiPrefix}/chapter`, routers.chapterRouter);
app.use(`${apiPrefix}/paypal`, routers.paypalRouter);
app.use(`${apiPrefix}/genre`, routers.genreRouter);
app.use(`${apiPrefix}/purchase`, routers.purchaseRouter);
app.use(`${apiPrefix}/rating`, routers.ratingRouter);
app.use(`${apiPrefix}/search`, routers.searchRouter);
app.use(`${apiPrefix}/user`, routers.userRouter);
app.use(`${apiPrefix}/wishlist`, routers.wishlistRouter);
app.get("/", (req, res) => {
	res.status(200).json({
		message: "Audiobook-Backend Service is running res",
	});
});

// Handle 404
app.use(function (req, res, next) {
	console.log("ERROR!", res);
	res.status(404).json({ error: "Route does not exist. :(" });
	return;
});

app.listen(env.PORT, () => {
	logger.success(`Audiobook-Backend is running on port ${env.PORT}`);
});

// console.log("[-] Testing Database Creation...");
// sequelize.sync({ force: true }).then(() => {
// 	console.log("[*] Database Created!");
// 	app.listen(env. PORT, () => {
// 		console.log(`[*] Audiobook-Backend is running on port ${env.PORT}`);
// 	});
// });
