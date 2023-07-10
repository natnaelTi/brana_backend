import {
	validateField,
	ValidationTypes as vTypes,
} from "../utils/validation.utils.js";

const getGenreModel = (sequelize, Sequelize) => {
	const Genre = sequelize.define("genre", {
		id: {
			type: Sequelize.DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	});

	Genre.associate = (models) => {
		Genre.hasMany(models.Audiobook, {
			foreignKey: {
				name: "genre_id",
				allowNull: false,
			},
		}); // Audiobook.Genre_id
		Genre.hasMany(models.UserPreference, {
			foreignKey: {
				name: "genre_id",
				allowNull: false,
			},
		}); // UserPreference.Genre_id
	};

	Genre.fromJSON = async (json) => {
		const newObject = {};
		Object.keys(Genre.json).forEach((key) => {
			newObject[key] = json[Genre.json[key].name];
		});
		return Genre.create(newObject);
	};

	// Add json here
	Genre.json = {
		name: { name: "name", type: vTypes.TEXT },
	};

	Genre.validation = (json, nullable: boolean) => {
		// returns list of results of validation checks
		const validationList = [];

		Object.keys(Genre.json).forEach((key) => {
			const name = Genre.json[key].name;
			const type = Genre.json[key].type;

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

	Genre.Faker = async () => {
		let count = await Genre.count();
		if (count != 0) return;
		let defaultGenres = [
			"Action and Adventure",
			"Comedy",
			"Classics",
			"Mystery",
			"Fairytale",
			"Fantasy",
			"Historical Fiction",
			"Alternate History",
			"Literary Fiction / Novel",
			"Romance",
			"Sci-Fi",
			"Horror",
			"Thriller",
			"Suspense",
			"Short Stories",
			"Play",
			"Wit",
			"Biography",
			"Autobiography",
			"Scripts",
			"Cookbooks",
			"History",
			"Memoir",
			"Poetry",
			"Self-help",
			"Crime",
			"Drama",
			"Satire",
			"Travel",
			"Journal",
			"Science",
			"Review",
			"Religion",
			"Prayer",
			"Politics",
			"Humor",
			"Diary",
			"Business / Economics",
			"Art / Architecture",
		];
		defaultGenres.forEach((genre) => {
			Genre.create({
				name: genre,
			});
		});
	};
	return Genre;
};

export default getGenreModel;
