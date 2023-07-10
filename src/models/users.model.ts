import bcrypt from "bcrypt";
import {
	validateField,
	ValidationTypes as vTypes,
} from "../utils/validation.utils.js";

const getUserModel = (sequelize, Sequelize) => {
	// Model
	const User = sequelize.define(
		"user",
		{
			id: {
				type: Sequelize.DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			first_name: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			last_name: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			email_verified_at: {
				type: Sequelize.DataTypes.DATE,
				allowNull: true,
			},
			password: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			avatar: {
				type: Sequelize.DataTypes.STRING,
				allowNull: true,
			},
			type: {
				type: Sequelize.DataTypes.INTEGER,
				defaultValue: 0,
			},
			verified: {
				type: Sequelize.DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			defaultScope: {
				attributes: { exclude: ["password"] },
			},
			scopes: {
				withPassword: {
					attributes: { exclude: [] },
				},
			},
		}
	);

	// Foreign Keys
	User.associate = (models) => {
		let userForeignKey = {
			foreignKey: {
				name: "user_id",
				allowNull: false,
			},
		};

		// ONE-TO-MANY
		User.hasMany(models.Rating, userForeignKey); // Rating.user_id
		User.hasMany(models.Cart, userForeignKey); // Cart.user_id
		User.hasMany(models.Purchase, userForeignKey); // Purchase.user_id
		User.hasMany(models.UserAudiobookProfile, userForeignKey); // UserAudiobookProfile.user_id
		User.hasMany(models.UserPreference, userForeignKey); // UserPreference.user_id
		User.hasMany(models.Wishlist, userForeignKey); // Wishlist.user_id
		// User.hasMany(models.TemporaryDownload, userForeignKey); // TemporaryDownload.user_id

		// ONE-TO-ONE
		// User.hasOne(models.Wallet, userForeignKey); // Wallet.user_id
	};

	User.findByEmail = async (email, scope: string = null) => {
		let user = await User.scope(scope).findOne({
			where: { email: email },
		});
		return user;
	};

	User.checkPassword = async (password: string, hashPassword: string) => {
		return bcrypt.compareSync(password, hashPassword);
	};

	User.fromJSON = async (json) => {
		const newObject = {};
		Object.keys(User.json).forEach((key) => {
			if (key === "password") {
				newObject["password"] = bcrypt.hashSync(json.password, 10);
			} else {
				newObject[key] = json[User.json[key].name];
			}
		});
		return User.create(newObject);

		// return User.create({
		// 	first_name: json.first_name,
		// 	last_name: json.last_name,
		// 	email: json.email,
		// 	password: bcrypt.hashSync(json.password, 10),
		// });
	};
	// Add json here
	User.json = {
		first_name: { name: "first_name", type: vTypes.TEXT },
		last_name: { name: "last_name", type: vTypes.TEXT },
		email: { name: "email", type: vTypes.EMAIL },
		password: { name: "password", type: vTypes.PASSWORD },
	};

	User.validation = (json, nullable: boolean) => {
		// returns list of results of validation checks
		const validationList = [];

		Object.keys(User.json).forEach((key) => {
			const name = User.json[key].name;
			const type = User.json[key].type;

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

	User.Faker = async (fakes) => {
		let count = await User.count();
		if (count != 0) return;
		for (let i = 0; i < fakes; i++) {
			await User.create({
				first_name: `first${i}`,
				last_name: `last${i}`,
				email: `user${i}@mail.com`,
				password: bcrypt.hashSync(`password${i}`, 10),
			});
		}
	};

	return User;
};

export default getUserModel;
