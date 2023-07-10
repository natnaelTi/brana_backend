// const getWalletLogModel = (sequelize, Sequelize) => {
// 	const WalletLog = sequelize.define("wallet_log", {
// 		id: {
// 			type: Sequelize.DataTypes.INTEGER,
// 			primaryKey: true,
// 			autoIncrement: true,
// 		},
// 		// wallet_id: {
// 		// 	type: Sequelize.DataTypes.INTEGER,
// 		// 	allowNull: false,
// 		// },
// 		transaction_amount: {
// 			type: Sequelize.DataTypes.FLOAT,
// 			allowNull: false,
// 		},
// 		transaction_type: {
// 			type: Sequelize.DataTypes.ENUM("Deposit", "Withdrawal"),
// 			allowNull: false,
// 		},
// 	});

// 	WalletLog.associate = (models) => {
// 		// WalletLog.wallet_id
// 		WalletLog.belongsTo(models.Wallet, {
// 			foreignKey: {
// 				name: "wallet_id",
// 				allowNull: false,
// 			},
// 		});
// 	};

// 	WalletLog.fromJSON = async (json) => {
// 		return WalletLog.create({
// 			wallet_id: json.wallet_id,
// 			transaction_amount: json.transaction_amount,
// 			transaction_type: json.transaction_type,
// 		});
// 	};

// 	WalletLog.Faker = async (fakes, walletModel) => {
// 		let count = await WalletLog.count();
// 		if (count != 0) return;

// 		let wallets = await walletModel.findAndCountAll({
// 			order: sequelize.random(),
// 		});

// 		if (wallets.count == 0) {
// 			throw "Wallets need to exist for wallet log faker to run";
// 		}
// 		console.log(wallets.rows.length);
// 		if (wallets.rows.length < fakes) {
// 			throw "Not enough wallets for given wallet log fakes";
// 		}

// 		for (let i = 0; i < wallets.rows.length; i++) {
// 			let wallet_logs = 0;
// 			for (let j = 0; j < fakes; j++) {
// 				if (wallet_logs > fakes) break;
// 				await WalletLog.create({
// 					wallet_id: wallets.rows[i].id,
// 					transaction_amount: Math.round(Math.random() * 10000) / 100,
// 					transaction_type: ["Deposit", "Withdrawal"][
// 						Math.floor(Math.random() * 2)
// 					],
// 				});
// 				wallet_logs += 1;
// 			}
// 		}
// 	};

// 	return WalletLog;
// };

// export default getWalletLogModel;
