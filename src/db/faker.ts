import models from "../models/models.js";
import * as logger from "../utils/logger.utils.js";

let num_fakes = 5;

try {
	await models.Genre.Faker();
	await models.Audiobook.Faker(num_fakes);
	await models.User.Faker(num_fakes);
	await models.Chapter.Faker(num_fakes, models.Audiobook);
	await models.Cart.Faker(num_fakes, models.User, models.Audiobook);
	await models.Purchase.Faker(num_fakes, models.User, models.Audiobook);
	await models.Rating.Faker(num_fakes, models.User, models.Audiobook);
	// await models.TemporaryDownload.Faker(num_fakes, models.User, models.Chapter);
	await models.UserAudiobookProfile.Faker(
		num_fakes,
		models.User,
		models.Audiobook
	);
	await models.UserPreference.Faker(num_fakes, models.User, models.Genre);
	// await models.Wallet.Faker(models.User);
	// await models.WalletLog.Faker(num_fakes, models.Wallet);
	await models.Wishlist.Faker(num_fakes, models.User, models.Audiobook);
} catch (err) {
	console.log(err);
	logger.error(err);
}

process.exit(0);
