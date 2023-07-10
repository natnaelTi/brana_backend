// const getWalletModel = (sequelize, Sequelize) => {
// 	const Wallet = sequelize.define("wallet", {
// 		id: {
// 			type: Sequelize.DataTypes.INTEGER,
// 			primaryKey: true,
// 			autoIncrement: true,
// 		},
// 		// user_id: {
// 		// 	type: Sequelize.DataTypes.INTEGER,
// 		// 	allowNull: false,
// 		// 	unique: true,
// 		// },
// 		balance: {
// 			type: Sequelize.DataTypes.FLOAT,
// 			allowNull: false,
// 			default: 0,
// 		},
// 	});

// 	Wallet.associate = (models) => {
// 		// Wallet.user_id
// 		Wallet.belongsTo(models.User, {
// 			foreignKey: {
// 				name: "user_id",
// 				allowNull: false,
// 			},
// 			onDelete: "CASCADE",
// 		});

// 		Wallet.hasMany(models.WalletLog, {
// 			foreignKey: {
// 				name: "wallet_id",
// 				allowNull: false,
// 			},
// 		}); // WalletLog.wallet_id
// 	};

// 	Wallet.fromJSON = async (json) => {
// 		return Wallet.create({
// 			user_id: json.user_id,
// 			balance: json.balance,
// 		});
// 	};

// 	Wallet.Faker = async (userModel) => {
// 		let count = await Wallet.count();
// 		if (count != 0) return;

// 		let users = await userModel.findAndCountAll();

// 		if (users.count == 0) {
// 			throw "Users need to exist for wallet faker to run";
// 		}

// 		for (let i = 0; i < users.rows.length; i++) {
// 			await Wallet.create({
// 				user_id: users.rows[i].id,
// 				balance: 1000.5,
// 			});
// 		}
// 	};
// 	return Wallet;
// };

// export default getWalletModel;
