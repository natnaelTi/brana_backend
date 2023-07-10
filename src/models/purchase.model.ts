import {
	validateField,
	ValidationTypes as vTypes,
} from "../utils/validation.utils.js";

const getPurchaseModel = (sequelize, Sequelize) => {
	const Purchase = sequelize.define("purchase", {
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
		price: {
			type: Sequelize.DataTypes.FLOAT,
			allowNull: false,
		},
		paymentMethod: {
			type: Sequelize.DataTypes.ENUM("paypal", "other"),
		},
	});

	Purchase.associate = (models) => {
		// Purchase.audiobook_id
		Purchase.belongsTo(models.Audiobook, {
			foreignKey: {
				name: "audiobook_id",
				allowNull: false,
			},
		});
		// Purchase.user_id
		Purchase.belongsTo(models.User, {
			foreignKey: {
				name: "user_id",
				allowNull: false,
			},
		});
		// Purchase.paypal_id
		Purchase.belongsTo(models.User, {
			foreignKey: {
				name: "paypal_id",
				allowNull: true,
			},
		});
	};

	Purchase.json = {
		user_id: { name: "user_id", type: vTypes.INT },
		audiobook_id: { name: "audiobook_id", type: vTypes.INT },
		price: { name: "price", type: vTypes.FLOAT },
	};

	Purchase.fromJSON = async (json) => {
		const newObject = {};
		Object.keys(Purchase.json).forEach((key) => {
			newObject[key] = json[Purchase.json[key].name];
		});
		return Purchase.create(newObject);
	};

	Purchase.validation = (json, nullable: boolean) => {
		// returns list of results of validation checks
		const validationList = [];

		Object.keys(Purchase.json).forEach((key) => {
			const name = Purchase.json[key].name;
			const type = Purchase.json[key].type;

			// if validation is successful, it returns null
			// if validation fails, it will return error text
			const validationResult = validateField(json, name, type, nullable);

			if (validationResult) {
				validationList.push(validationResult);
			}
		});

		return validationList;
	};

	Purchase.Faker = async (fakes, userModel, audiobookModel) => {
		let count = await Purchase.count();
		if (count != 0) return;

		let users = await userModel.findAndCountAll({
			order: sequelize.random(),
		});
		let audiobooks = await audiobookModel.findAndCountAll({
			limit: fakes,
			order: sequelize.random(),
		});

		if (users.count == 0) {
			throw "Users need to exist for purchase faker to run";
		}
		if (audiobooks.count == 0) {
			throw "Audiobooks need to exist for purchase faker to run";
		}

		if (users.rows.length * audiobooks.rows.length < fakes) {
			throw "Not enough users and audiobooks for given purchase fakes";
		}

		let randomAudiobooks = audiobooks.rows;
		for (let i = 0; i < users.rows.length; i++) {
			let purchase_items = 0;
			for (let j = 0; j < randomAudiobooks.length; j++) {
				if (purchase_items > fakes) break;
				await Purchase.create({
					user_id: users.rows[i].id,
					audiobook_id: randomAudiobooks[j].id,
					price: Math.floor(Math.random() * 100),
				});
				purchase_items += 1;
			}
			randomAudiobooks = randomAudiobooks
				.map((value) => ({ value, sort: Math.random() }))
				.sort((a, b) => a.sort - b.sort)
				.map(({ value }) => value);
		}
	};
	return Purchase;
};

export default getPurchaseModel;
