// const getTemporaryDownloadModel = (sequelize, Sequelize) => {
// 	const TemporaryDownload = sequelize.define("temporary_download", {
// 		hash: {
// 			type: Sequelize.DataTypes.STRING,
// 			primaryKey: true,
// 		},
// 		// user_id: {
// 		// 	type: Sequelize.DataTypes.INTEGER,
// 		// 	allowNull: false,
// 		// },
// 		// audiobook_id: {
// 		// 	type: Sequelize.DataTypes.INTEGER,
// 		// 	allowNull: false,
// 		// },
// 		chapter: {
// 			type: Sequelize.DataTypes.INTEGER,
// 			allowNull: false,
// 		},
// 		valid_until: {
// 			type: Sequelize.DataTypes.DATE,
// 			allowNull: false,
// 		},
// 	});

// 	TemporaryDownload.associate = (models) => {
// 		// TemporaryDownload.audiobook_id
// 		TemporaryDownload.belongsTo(models.Audiobook, {
// 			foreignKey: {
// 				name: "audiobook_id",
// 				allowNull: false,
// 			},
// 		});
// 		// TemporaryDownload.user_id
// 		TemporaryDownload.belongsTo(models.User, {
// 			foreignKey: {
// 				name: "user_id",
// 				allowNull: false,
// 			},
// 		});
// 	};

// 	TemporaryDownload.fromJSON = async (json) => {
// 		return TemporaryDownload.create({
// 			hash: json.hash,
// 			user_id: json.user_id,
// 			audiobook_id: json.audiobook_id,
// 			chapter: json.chapter,
// 			valid_until: json.valid_until,
// 		});
// 	};

// 	TemporaryDownload.Faker = async (fakes, userModel, chapterModel) => {
// 		let count = await TemporaryDownload.count();
// 		if (count != 0) return;

// 		let users = await userModel.findAndCountAll({
// 			order: sequelize.random(),
// 		});
// 		let chapters = await chapterModel.findAndCountAll({
// 			limit: fakes,
// 			order: sequelize.random(),
// 		});

// 		if (users.count == 0) {
// 			throw "Users need to exist for temporary download faker to run";
// 		}
// 		if (chapters.count == 0) {
// 			throw "Chapters need to exist for temporary download faker to run";
// 		}

// 		if (users.rows.length * chapters.rows.length < fakes) {
// 			throw "Not enough users and chapters for given temporary download fakes";
// 		}
// 		let randomChapters = chapters.rows;
// 		for (let i = 0; i < users.rows.length; i++) {
// 			let temp_downloads = 0;
// 			for (let j = 0; j < randomChapters.length; j++) {
// 				if (temp_downloads > fakes) break;
// 				await TemporaryDownload.create({
// 					hash: `hash${i}${j}-` + Math.floor(Math.random() * 1e12),
// 					user_id: users.rows[i].id,
// 					audiobook_id: randomChapters[j].audiobook_id,
// 					chapter: randomChapters[j].number,
// 					valid_until: new Date(Date.now() - Math.random() * 1e12),
// 				});
// 				temp_downloads += 1;
// 			}
// 			randomChapters = randomChapters
// 				.map((value) => ({ value, sort: Math.random() }))
// 				.sort((a, b) => a.sort - b.sort)
// 				.map(({ value }) => value);
// 		}
// 	};
// 	return TemporaryDownload;
// };

// export default getTemporaryDownloadModel;
