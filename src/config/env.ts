import * as dotenv from "dotenv";
dotenv.config();

const env = {
	// General
	URL: process.env.URL,
	PORT: process.env.PORT || 4000,
	ENVIRONMENT: process.env.ENVIRONMENT,

	// DB
	DATABASE: process.env.DATABASE,
	DATABASE_USER: process.env.DATABASE_USER,
	DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
	DATABASE_DIALECT: process.env.DATABASE_DIALECT,

	//Auth
	SECRET_KEY: process.env.SECRET_KEY,
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
	GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,

	// Paypal
	PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
	PAYPAL_SECRET: process.env.PAYPAL_SECRET,
};

export default env;
