import {
	getCartService,
	deleteUserCartService,
} from "../../services/barrel.user.service.js";
import { create as createPurchase } from "../../services/purchase.service.js";
import * as paypalService from "../../services/paypal.service.js";
import env from "../../config/env.js";
import {
	responseGenerator,
	responseTypes,
	messageTypes,
} from "../../utils/responseGenerator.utils.js";

// Renders the cart and the paypal buttons
export async function checkout(req, res) {
	const resGen = new responseGenerator(res, "Checkout", messageTypes.OPERATION);

	const cart = await getCartService(req.user.dataValues.id, {
		including: {
			audiobook: true,
		},
	});

	if (cart.length == 0) {
		return resGen.error(responseTypes.CLIENT_ERROR, "No items in cart");
	}

	let total = 0;

	cart.forEach((cartItem) => {
		total += cartItem.dataValues.audiobook.price;
	});

	res.render("paypal.checkout.ejs", {
		clientID: env.PAYPAL_CLIENT_ID,
		cart: cart,
		total: total,
		user: req.user,
	});
}

// TODO: add token authentication from webview side
// Creates a paypal order
export async function order(req, res) {

	const resGen = new responseGenerator(res, "Paypal Order", messageTypes.OPERATION);

	// Create a paypal record
	
	const cart = await getCartService(req.user.dataValues.id, {
		including: {
			audiobook: true,
		},
	});

	if (cart.length == 0) {
		return resGen.error(responseTypes.CLIENT_ERROR, "No items in cart");
	}
	let items = [];
	let total = 0;

	// convert to paypal
	cart.forEach((cartItem) => {
		items.push({
			name: cartItem.dataValues.audiobook.title,
			quantity: "1",
			unit_amount: {
				currency_code: "USD",
				value: cartItem.dataValues.audiobook.price.toString(),
			},
		});
		total += cartItem.dataValues.audiobook.price;
	});
	const order = await paypalService.createOrder(items, total);

	return res.status(200).json(order);
}

// Captures the paypal approval response
export async function capture(req, res) {
	const { orderID, user, total } = req.body;

	const captureData = await paypalService.capturePayment(orderID);

	// Create a paypal record in database
	// TODO: change to non-json function
	const paypalItem = paypalService.create({
		order_id: orderID,
		total: total,
	});
	if (!paypalItem) {
		return res.status(500).json({
			message: "Paypal Capture Error",
			error: "Failed to store paypal information",
		});
	}
	// Add to purchase

	return res.status(200).json(captureData);
}
