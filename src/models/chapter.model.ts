import {
	validateField,
	ValidationTypes as vTypes,
} from "../utils/validation.utils.js";

const getChapterModel = (sequelize, Sequelize) => {
	const Chapter = sequelize.define(
		"chapter",
		{
			id: {
				type: Sequelize.DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			number: {
				type: Sequelize.DataTypes.INTEGER,
				allowNull: false,
			},
			// audiobook_id: {
			// 	type: Sequelize.DataTypes.INTEGER,
			// 	allowNull: false,
			// },
			name: {
				type: Sequelize.DataTypes.STRING,
				allowNull: true,
			},
			description: {
				type: Sequelize.DataTypes.TEXT,
				allowNull: true,
			},
			file: {
				type: Sequelize.DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			indexes: [
				{
					unique: true,
					fields: ["number", "audiobook_id"],
				},
			],
			defaultScope: {
				attributes: { exclude: ["file"] },
			},
			scopes: {
				withFile: {
					attributes: { exclude: [] },
				},
			},
		}
	);

	Chapter.associate = (models) => {
		// Chapter.audiobook_id
		Chapter.belongsTo(models.Audiobook, {
			foreignKey: {
				name: "audiobook_id",
				allowNull: false,
			},
		});
	};

	Chapter.json = {
		number: { name: "number", type: vTypes.INT },
		name: { name: "name", type: vTypes.TEXT, nullable: true },
		audiobook_id: { name: "audiobook_id", type: vTypes.INT },
		description: {
			name: "description",
			type: vTypes.LONG_TEXT,
			nullable: true,
		},
	};

	Chapter.fromJSON = async (json) => {
		const newObject = {};
		Object.keys(Chapter.json).forEach((key) => {
			newObject[key] = json[Chapter.json[key].name];
		});
		return Chapter.create(newObject);
	};

	Chapter.validation = (json, nullable: boolean) => {
		// returns list of results of validation checks
		const validationList = [];

		Object.keys(Chapter.json).forEach((key) => {
			const name = Chapter.json[key].name;
			const type = Chapter.json[key].type;
			const fieldNull = Chapter.json[key].nullable ?? false;
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

		return validationList;
	};

	Chapter.Faker = async (chapters, audiobookModel) => {
		let count = await Chapter.count();
		if (count != 0) return;

		let audiobooks = await audiobookModel.findAndCountAll({
			order: sequelize.random(),
		});

		if (audiobooks.count == 0) {
			throw "Audiobooks need to exist for chapter faker to run";
		}

		for (let i = 0; i < audiobooks.rows.length; i++) {
			for (let j = 1; j < chapters; j++) {
				await Chapter.create({
					number: j,
					name: `Chapter ${j}`,
					audiobook_id: audiobooks.rows[i].id,
					description: `chapter ${j} of audiobook ${audiobooks.rows[i].id} is about ${j}`,
					file: null,
				});
			}
		}
	};

	return Chapter;
};

export default getChapterModel;
