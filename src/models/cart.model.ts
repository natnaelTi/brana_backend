import {
	validateField,
	ValidationTypes as vTypes,
} from "../utils/validation.utils.js";

const getCartModel = (sequelize, Sequelize) => {
	const Cart = sequelize.define("cart", {
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

	Cart.associate = (models) => {
		// Cart.audiobook_id
		Cart.belongsTo(models.Audiobook, {
			foreignKey: {
				name: "audiobook_id",
				allowNull: false,
			},
		});
		// Cart.user_id
		Cart.belongsTo(models.User, {
			foreignKey: {
				name: "user_id",
				allowNull: false,
			},
		});
	};

	Cart.json = {
		user_id: { name: "user_id", type: vTypes.INT },
		audiobook_id: { name: "audiobook_id", type: vTypes.INT },
	};

	Cart.fromJSON = async (json) => {
		const newObject = {};
		Object.keys(Cart.json).forEach((key) => {
			newObject[key] = json[Cart.json[key].name];
		});
		return Cart.create(newObject);
	};

	Cart.validation = (json, nullable: boolean) => {
		// returns list of results of validation checks
		const validationList = [];

		Object.keys(Cart.json).forEach((key) => {
			const name = Cart.json[key].name;
			const type = Cart.json[key].type;

			// if validation is successful, it returns null
			// if validation fails, it will return error text
			const validationResult = validateField(json, name, type, nullable);

			if (validationResult) {
				validationList.push(validationResult);
			}
		});

		return validationList;
	};

	Cart.Faker = async (cart_per_user, userModel, audiobookModel) => {
		let count = await Cart.count();
		if (count != 0) return;

		let users = await userModel.findAndCountAll({
			order: sequelize.random(),
		});
		let audiobooks = await audiobookModel.findAndCountAll({
			order: sequelize.random(),
		});

		if (users.count == 0) {
			throw "Users need to exist for cart faker to run";
		}
		if (audiobooks.count == 0) {
			throw "Audiobooks need to exist for cart faker to run";
		}

		let randomAudiobooks = audiobooks.rows;
		for (let i = 0; i < users.rows.length; i++) {
			let cart_items = 0;
			for (let j = 0; j < randomAudiobooks.length; j++) {
				if (cart_items == cart_per_user) break;
				await Cart.create({
					user_id: users.rows[i].id,
					audiobook_id: randomAudiobooks[j].id,
				});
				cart_items += 1;
			}
			randomAudiobooks = randomAudiobooks
				.map((value) => ({ value, sort: Math.random() }))
				.sort((a, b) => a.sort - b.sort)
				.map(({ value }) => value);
		}
	};
	return Cart;
};

export default getCartModel;
