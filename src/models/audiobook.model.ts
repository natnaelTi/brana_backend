import {
	validateField,
	ValidationTypes as vTypes,
} from "../utils/validation.utils.js";

const getAudiobookModel = (sequelize, Sequelize) => {
	const Audiobook = sequelize.define("audiobook", {
		id: {
			type: Sequelize.DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: Sequelize.DataTypes.STRING,
			unique: true,
		},
		// genre_id: {
		// 	type: Sequelize.DataTypes.INTEGER,
		// },
		logline: {
			type: Sequelize.DataTypes.STRING,
		},
		cover: {
			type: Sequelize.DataTypes.STRING,
			allowNull: true,
		},
		author: {
			type: Sequelize.DataTypes.STRING,
		},
		narrator: {
			type: Sequelize.DataTypes.STRING,
			allowNull: true,
		},
		number_of_chapters: {
			type: Sequelize.DataTypes.INTEGER,
		},
		price: {
			type: Sequelize.DataTypes.FLOAT,
			defaultValue: 0,
		},
		duration: {
			type: Sequelize.DataTypes.INTEGER,
			defaultValue: 0,
		},
		folder: {
			type: Sequelize.DataTypes.STRING,
			unique: true,
			allowNull: true,
		},
		sample: {
			type: Sequelize.DataTypes.STRING,
			unique: true,
			allowNull: true,
		},
	});

	Audiobook.associate = (models) => {
		// Audiobook.Genre_id
		Audiobook.belongsTo(models.Genre, {
			foreignKey: {
				name: "genre_id",
				allowNull: false,
			},
		});

		let audiobookForeignKey = {
			foreignKey: {
				name: "audiobook_id",
				allowNull: false,
			},
		};

		Audiobook.hasMany(models.Rating, audiobookForeignKey); // Rating.audiobook_id
		Audiobook.hasMany(models.Cart, audiobookForeignKey); // Cart.audiobook_id
		Audiobook.hasMany(models.Chapter, audiobookForeignKey); // Chapter.audiobook_id
		Audiobook.hasMany(models.Purchase, audiobookForeignKey); // Purchase.audiobook_id
		Audiobook.hasMany(models.UserAudiobookProfile, audiobookForeignKey); // UserAudiobookProfile.audiobook_id
		Audiobook.hasMany(models.Wishlist, audiobookForeignKey); // Wishlist.audiobook_id
		// Audiobook.hasMany(models.TemporaryDownload, audiobookForeignKey); // TemporaryDownload.audiobook_id
	};

	Audiobook.json = {
		title: { name: "title", type: vTypes.TEXT },
		genre_id: { name: "genre_id", type: vTypes.INT },
		logline: { name: "logline", type: vTypes.TEXT },
		author: { name: "author", type: vTypes.TEXT },
		narrator: { name: "narrator", type: vTypes.TEXT },
		number_of_chapters: { name: "number_of_chapters", type: vTypes.INT },
		price: { name: "price", type: vTypes.FLOAT },
		duration: { name: "duration", type: vTypes.INT },
	};
	Audiobook.fromJSON = async (json) => {
		const newObject = {};
		Object.keys(Audiobook.json).forEach((key) => {
			newObject[key] = json[Audiobook.json[key].name];
		});
		return Audiobook.create(newObject);
	};

	Audiobook.validation = (json, nullable: boolean) => {
		// returns list of results of validation checks
		const validationList = [];

		Object.keys(Audiobook.json).forEach((key) => {
			const name = Audiobook.json[key].name;
			const type = Audiobook.json[key].type;

			// if validation is successful, it returns null
			// if validation fails, it will return error text
			const validationResult = validateField(json, name, type, nullable);

			if (validationResult) {
				validationList.push(validationResult);
			}
		});

		// Additional validations
		// ...

		return validationList;
	};

	Audiobook.Faker = async (fakes) => {
		let count = await Audiobook.count();
		if (count != 0) return;
		for (let i = 1; i < fakes + 1; i++) {
			await Audiobook.create({
				title: `audiobook${i}`,
				genre_id: 1,
				logline: `audiobook${i} is about ${i}`,
				author: `author${i}`,
				narrator: `narrator${i}`,
				number_of_chapters: i,
				price: i + 0.5,
				duration: i,
				folder: null,
				sample: null,
			});
		}
	};
	return Audiobook;
};

export default getAudiobookModel;
