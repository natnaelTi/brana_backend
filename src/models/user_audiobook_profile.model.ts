const getUserAudiobookProfileModel = (sequelize, Sequelize) => {
	const UserAudiobookProfile = sequelize.define("user_audiobook_profile", {
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
		read_status: {
			type: Sequelize.DataTypes.ENUM("Unread", "Read", "Finished"),
			allowNull: false,
		},
	});

	UserAudiobookProfile.associate = (models) => {
		// UserAudiobookProfile.audiobook_id
		UserAudiobookProfile.belongsTo(models.Audiobook, {
			foreignKey: {
				name: "audiobook_id",
				allowNull: false,
			},
		});
		// UserAudiobookProfile.user_id
		UserAudiobookProfile.belongsTo(models.User, {
			foreignKey: {
				name: "user_id",
				allowNull: false,
			},
		});
	};

	UserAudiobookProfile.fromJSON = async (json) => {
		return UserAudiobookProfile.create({
			user_id: json.user_id,
			audiobook_id: json.audiobook_id,
			read_status: json.read_status,
		});
	};

	UserAudiobookProfile.Faker = async (fakes, userModel, audiobookModel) => {
		let count = await UserAudiobookProfile.count();
		if (count != 0) return;

		let users = await userModel.findAndCountAll();
		let audiobooks = await audiobookModel.findAndCountAll({
			limit: fakes,
			order: sequelize.random(),
		});

		if (users.count == 0) {
			throw "Users need to exist for profiles faker to run";
		}
		if (audiobooks.count == 0) {
			throw "Audiobooks need to exist for profiles faker to run";
		}

		if (users.rows.length * audiobooks.rows.length < fakes) {
			throw "Not enough users and audiobooks for given profiles fakes";
		}
		let randomProfiles = audiobooks.rows;
		for (let i = 0; i < users.rows.length; i++) {
			let user_profiles = 0;
			for (let j = 0; j < randomProfiles.length; j++) {
				if (user_profiles > fakes) break;
				await UserAudiobookProfile.create({
					user_id: users.rows[i].id,
					audiobook_id: randomProfiles[j].id,
					read_status: ["Unread", "Read", "Finished"][
						Math.floor(Math.random() * 3)
					],
				});
				user_profiles += 1;
			}
			randomProfiles = randomProfiles
				.map((value) => ({ value, sort: Math.random() }))
				.sort((a, b) => a.sort - b.sort)
				.map(({ value }) => value);
		}
	};
	return UserAudiobookProfile;
};

export default getUserAudiobookProfileModel;
