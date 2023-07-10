import { Sequelize, DataTypes } from "sequelize";
import env from "../config/env.js";

import getAudiobookModel from "./audiobook.model.js";
import getCartModel from "./cart.model.js";
import getChapterModel from "./chapter.model.js";
import getGenreModel from "./genre.model.js";
import getPurchaseModel from "./purchase.model.js";
import getRatingModel from "./rating.model.js";
// import getTemporaryDownloadModel from "./temporary_download.model.js";
import getUserAudiobookProfileModel from "./user_audiobook_profile.model.js";
import getUserPreferenceModel from "./user_preference.model.js";
import getUserModel from "./users.model.js";
// import getWalletLogModel from "./wallet_log.model.js";
// import getWalletModel from "./wallet.model.js";
import getWishlistModel from "./wishlist.model.js";
import getPaypalModel from "./paypal.model.js";

const sequelize = new Sequelize(
	env.DATABASE,
	env.DATABASE_USER,
	env.DATABASE_PASSWORD,
	{
		dialect: "postgres",
	}
);

const models = {
	Audiobook: getAudiobookModel(sequelize, Sequelize),
	Cart: getCartModel(sequelize, Sequelize),
	Chapter: getChapterModel(sequelize, Sequelize),
	Genre: getGenreModel(sequelize, Sequelize),
	Purchase: getPurchaseModel(sequelize, Sequelize),
	Rating: getRatingModel(sequelize, Sequelize),
	// TemporaryDownload: getTemporaryDownloadModel(sequelize, Sequelize),
	UserAudiobookProfile: getUserAudiobookProfileModel(sequelize, Sequelize),
	User: getUserModel(sequelize, Sequelize),
	UserPreference: getUserPreferenceModel(sequelize, Sequelize),
	// Wallet: getWalletModel(sequelize, Sequelize),
	// WalletLog: getWalletLogModel(sequelize, Sequelize),
	Wishlist: getWishlistModel(sequelize, Sequelize),
	Paypal: getPaypalModel(sequelize, Sequelize),
};

// Run the associations for all the models
Object.keys(models).forEach((key) => {
	if ("associate" in models[key]) {
		models[key].associate(models);
	}
});

export { sequelize };

export default models;
