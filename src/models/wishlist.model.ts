import {
	validateField,
	ValidationTypes as vTypes,
} from "../utils/validation.utils.js";

const getWishlistModel = (sequelize, Sequelize) => {
	const Wishlist = sequelize.define("wishlist", {
		id: {
			type: Sequelize.DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		// user_id: {
		// 	type: Sequelize.DataTypes.INTEGER,
		// 	allowNull: false,
		// },
		// audiobook_id: {
		// 	type: Sequelize.DataTypes.INTEGER,
		// 	allowNull: false,
		// },
	});

	Wishlist.associate = (models) => {
		// Wishlist.audiobook_id
		Wishlist.belongsTo(models.Audiobook, {
			foreignKey: {
				name: "audiobook_id",
				allowNull: false,
			},
		});
		// Wishlist.user_id
		Wishlist.belongsTo(models.User, {
			foreignKey: {
				name: "user_id",
				allowNull: false,
			},
		});
	};
	Wishlist.json = {
		user_id: { name: "user_id", type: vTypes.INT },
		audiobook_id: { name: "audiobook_id", type: vTypes.INT },
	};

	Wishlist.fromJSON = async (json) => {
		const newObject = {};
		Object.keys(Wishlist.json).forEach((key) => {
			newObject[key] = json[Wishlist.json[key].name];
		});
		return Wishlist.create(newObject);
	};

	Wishlist.validation = (json, nullable: boolean) => {
		// returns list of results of validation checks
		const validationList = [];

		Object.keys(Wishlist.json).forEach((key) => {
			const name = Wishlist.json[key].name;
			const type = Wishlist.json[key].type;

			// if validation is successful, it returns null
			// if validation fails, it will return error text
			const validationResult = validateField(json, name, type, nullable);

			if (validationResult) {
				validationList.push(validationResult);
			}
		});

		return validationList;
	};

	Wishlist.Faker = async (fakes, userModel, audiobookModel) => {
		let count = await Wishlist.count();
		if (count != 0) return;

		let users = await userModel.findAndCountAll();
		let audiobooks = await audiobookModel.findAndCountAll({
			limit: fakes,
			order: sequelize.random(),
		});

		if (users.count == 0) {
			throw "Users need to exist for wishlist faker to run";
		}
		if (audiobooks.count == 0) {
			throw "Audiobooks need to exist for wishlist faker to run";
		}

		if (users.rows.length * audiobooks.rows.length < fakes) {
			throw "Not enough users and audiobooks for given wishlist fakes";
		}

		let randomAudiobooks = audiobooks.rows;

		for (let i = 0; i < users.rows.length; i++) {
			let wishlists = 0;
			for (let j = 0; j < randomAudiobooks.length; j++) {
				if (wishlists > fakes) break;
				await Wishlist.create({
					user_id: users.rows[i].id,
					audiobook_id: randomAudiobooks[j].id,
				});
				wishlists += 1;
			}
			randomAudiobooks = randomAudiobooks
				.map((value) => ({ value, sort: Math.random() }))
				.sort((a, b) => a.sort - b.sort)
				.map(({ value }) => value);
		}
	};

	return Wishlist;
};

export default getWishlistModel;
