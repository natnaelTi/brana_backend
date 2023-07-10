import {
	validateField,
	ValidationTypes as vTypes,
} from "../utils/validation.utils.js";

const getPaypalModel = (sequelize, Sequelize) => {
	const Paypal = sequelize.define("paypal", {
		id: {
			type: Sequelize.DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		order_id: {
			type: Sequelize.DataTypes.INTEGER,
		},
		total: {
			type: Sequelize.DataTypes.FLOAT,
		},
		status: {
			type: Sequelize.DataTypes.ENUM("init", "paid"),
		},
	});

	Paypal.json = {
		order_id: { name: "order_id", type: vTypes.INT },
		price: { name: "price", type: vTypes.FLOAT },
	};

	Paypal.fromJSON = async (json) => {
		const newObject = {};
		Object.keys(Paypal.json).forEach((key) => {
			newObject[key] = json[Paypal.json[key].name];
		});
		return Paypal.create(newObject);
	};

	Paypal.validation = (json, nullable: boolean) => {
		// returns list of results of validation checks
		const validationList = [];

		Object.keys(Paypal.json).forEach((key) => {
			const name = Paypal.json[key].name;
			const type = Paypal.json[key].type;

			// if validation is successful, it returns null
			// if validation fails, it will return error text
			const validationResult = validateField(json, name, type, nullable);

			if (validationResult) {
				validationList.push(validationResult);
			}
		});

		return validationList;
	};

	return Paypal;
};

export default getPaypalModel;
