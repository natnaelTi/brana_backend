import env from "../config/env.js";
import fetch from "node-fetch";
import models from "../models/models.js";
import {
	createGen,
	getAllGen,
	getPaginatedGen,
	getOneGen,
} from "../utils/ServiceGenerator.util.js";

const base = "https://api-m.sandbox.paypal.com";

// CRUD
export const create = createGen(models.Paypal);
export const getAll = getAllGen(models.Paypal);
export const getPages = getPaginatedGen(models.Paypal);
export const getOne = getOneGen(models.Paypal);

// generate an access token using client id and app secret
async function generateAccessToken() {
	const auth = Buffer.from(
		env.PAYPAL_CLIENT_ID + ":" + env.PAYPAL_SECRET
	).toString("base64");
	const response = await fetch(`${base}/v1/oauth2/token`, {
		method: "POST",
		body: "grant_type=client_credentials",
		headers: {
			Authorization: `Basic ${auth}`,
		},
	});
	const data: any = await response.json();
	return data.access_token;
}

export async function createOrder(items, total) {
	const accessToken = await generateAccessToken();
	const url = `${base}/v2/checkout/orders`;

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({
			intent: "CAPTURE",
			purchase_units: [
				{
					description: "Cart Checkout For Berana Audiobook",
					items: JSON.parse(items),
					amount: {
						currency_code: "USD",
						value: total,
						breakdown: {
							item_total: {
								currency_code: "USD",
								value: total,
							},
						},
					},
				},
			],
		}),
	});

	const data = await response.json();
	console.log(data);
	return data;
}

// use the orders api to capture payment for an order
export async function capturePayment(orderId) {
	const accessToken = await generateAccessToken();

	const url = `${base}/v2/checkout/orders/${orderId}/capture`;
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
	const data = await response.json();
	return data;
}
