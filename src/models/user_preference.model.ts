const getUserPreferenceModel = (sequelize, Sequelize) => {
	const UserPreference = sequelize.define("user_preference", {
		id: {
			type: Sequelize.DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		// user_id: {
		// 	type: Sequelize.DataTypes.INTEGER,
		// 	allowNull: false,
		// },
		// genre_id: {
		// 	type: Sequelize.DataTypes.INTEGER,
		// 	allowNull: false,
		// },
	});

	UserPreference.associate = (models) => {
		// UserPreference.user_id
		UserPreference.belongsTo(models.User, {
			foreignKey: {
				name: "user_id",
				allowNull: false,
			},
		});
		// UserPreference.genre_id
		UserPreference.belongsTo(models.Genre, {
			foreignKey: {
				name: "genre_id",
				allowNull: false,
			},
		});
	};

	UserPreference.fromJSON = async (json) => {
		return UserPreference.create({
			user_id: json.user_id,
			genre_id: json.genre_id,
		});
	};

	UserPreference.Faker = async (fakes, userModel, genreModel) => {
		let count = await UserPreference.count();
		if (count != 0) return;

		let users = await userModel.findAndCountAll({
			order: sequelize.random(),
		});
		let genres = await genreModel.findAndCountAll({
			order: sequelize.random(),
		});

		if (users.count == 0) {
			throw "Users need to exist for preference faker to run";
		}
		if (genres.count == 0) {
			throw "Genres need to exist for preference faker to run";
		}

		if (users.rows.length * genres.rows.length < fakes) {
			throw "Not enough users and genres for given preference fakes";
		}
		let randomGenres = genres.rows;
		for (let i = 0; i < users.rows.length; i++) {
			let preferences = 0;
			for (let j = 0; j < randomGenres.length; j++) {
				if (preferences > fakes) break;
				await UserPreference.create({
					user_id: users.rows[i].id,
					genre_id: randomGenres[j].id,
				});
				preferences += 1;
			}

			randomGenres = randomGenres
				.map((value) => ({ value, sort: Math.random() }))
				.sort((a, b) => a.sort - b.sort)
				.map(({ value }) => value);
		}
	};
	return UserPreference;
};

export default getUserPreferenceModel;
