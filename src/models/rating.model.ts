import {
	validateField,
	ValidationTypes as vTypes,
} from "../utils/validation.utils.js";

const getRatingModel = (sequelize, Sequelize) => {
	const Rating = sequelize.define("rating", {
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
		rating: {
			type: Sequelize.DataTypes.INTEGER,
			allowNull: false,
		},
		comment: {
			type: Sequelize.DataTypes.STRING,
		},
	});

	Rating.associate = (models) => {
		// Rating.audiobook_id
		Rating.belongsTo(models.Audiobook, {
			foreignKey: {
				name: "audiobook_id",
				allowNull: false,
			},
		});
		// Rating.user_id
		Rating.belongsTo(models.User, {
			foreignKey: {
				name: "user_id",
				allowNull: false,
			},
		});
	};

	Rating.json = {
		user_id: { name: "user_id", type: vTypes.INT },
		audiobook_id: { name: "audiobook_id", type: vTypes.INT },
		rating: { name: "rating", type: vTypes.INT },
		comment: { name: "comment", type: vTypes.TEXT, nullable: true },
	};

	Rating.fromJSON = async (json) => {
		const newObject = {};
		Object.keys(Rating.json).forEach((key) => {
			newObject[key] = json[Rating.json[key].name];
		});
		return Rating.create(newObject);
	};

	Rating.validation = (json, nullable: boolean) => {
		// returns list of results of validation checks
		const validationList = [];

		Object.keys(Rating.json).forEach((key) => {
			const name = Rating.json[key].name;
			const type = Rating.json[key].type;
			const fieldNull = Rating.json[key].nullable ?? false;
			// if validation is successful, it returns null
			// if validation fails, it will return error text
			const validationResult = validateField(
				json,
				name,
				type,
				nullable || fieldNull
			);

			if (validationResult) {
				validationList.push(validationResult);
			}
		});

		// Additional validations
		if (json.rating > 10) {
			validationList.push("rating cannot be greater than 10");
		} else if (json.rating < 0) {
			validationList.push("rating cannot be less than 0");
		}

		// TODO: profanity checker for comments

		return validationList;
	};

	Rating.Faker = async (fakes, userModel, audiobookModel) => {
		let count = await Rating.count();
		if (count != 0) return;

		let users = await userModel.findAndCountAll({
			order: sequelize.random(),
		});

		let audiobooks = await audiobookModel.findAndCountAll({
			limit: fakes,
			order: sequelize.random(),
		});

		if (users.count == 0) {
			throw "Users need to exist for rating faker to run";
		}
		if (audiobooks.count == 0) {
			throw "Audiobooks need to exist for rating faker to run";
		}

		if (users.rows.length * audiobooks.rows.length < fakes) {
			throw "Not enough users and audiobooks for given rating fakes";
		}
		let randomAudiobooks = audiobooks.rows;
		for (let i = 0; i < users.rows.length; i++) {
			let rating_items = 0;
			for (let j = 0; j < randomAudiobooks.length; j++) {
				if (rating_items > fakes) break;
				await Rating.create({
					user_id: users.rows[i].id,
					audiobook_id: randomAudiobooks[j].id,
					rating: i % 10,
					comment: `this audiobook was very much a ${i}`,
				});
				rating_items += 1;
			}
			randomAudiobooks = randomAudiobooks
				.map((value) => ({ value, sort: Math.random() }))
				.sort((a, b) => a.sort - b.sort)
				.map(({ value }) => value);
		}
	};
	return Rating;
};

export default getRatingModel;
