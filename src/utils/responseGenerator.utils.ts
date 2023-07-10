// TODO: handle more response
export enum responseTypes {
	SUCCESS = 200,
	CLIENT_ERROR = 400,
	SERVER_ERROR = 500,
	AUTH_ERROR = 401,
}

export enum messageTypes {
	CREATE,
	GET_ALL,
	GET_ONE,
	GET_PAGES,
	UPDATE,
	DELETE,
	OPERATION,
}

function successText(success) {
	return `${success ? "successfully been" : "failed to be"}`;
}

function create(name, success = true) {
	return `${name} has ${successText(success)} created`;
}
function getAll(name, success = true) {
	return `All ${name}s have ${successText(success)}  retrieved`;
}
function getPages(name, success = true) {
	return `${name} page has ${successText(success)} retrieved`;
}
function getOne(name, success = true) {
	return `Single ${name} has ${successText(success)} retrieved`;
}
function update(name, success = true) {
	return `${name} has ${successText(success)} updated`;
}
function deleteOne(name, success = true) {
	return `Single ${name} has ${successText(success)} removed`;
}

function operation(name, success = true) {
	return `${name} ${success ? "Successful" : "Failed"}!`;
}

function getMessageFunction(messageType: messageTypes) {
	switch (messageType) {
		case messageTypes.CREATE:
			return create;

		case messageTypes.GET_ALL:
			return getAll;

		case messageTypes.GET_PAGES:
			return getPages;

		case messageTypes.GET_ONE:
			return getOne;

		case messageTypes.UPDATE:
			return update;

		case messageTypes.DELETE:
			return deleteOne;
		case messageTypes.OPERATION:
			return operation;

		default:
			throw new Error("Not implemented");
	}
}

type simpleResponse = {
	message: string;
};
type errorResponse = {
	message: string;
	error: string;
};
type dataResponse = {
	message: string;
	[key: string]: any;
};
type pageResponse = {
	message: string;
	data: any;
	total: number;
	total_pages: number;
	items_per_page: number;
};
export class responseGenerator {
	res: any;
	name: string;
	messageType: messageTypes;
	messageFunction: (name: any, success?: boolean) => string;

	constructor(res: any, name: string, messageType: messageTypes) {
		this.res = res;
		this.name = name;
		this.messageType = messageType;
		this.messageFunction = getMessageFunction(this.messageType);
	}

	// Simple response
	simple(responseType: responseTypes) {
		// Generating response json

		if (responseType != responseTypes.SUCCESS) {
			throw new Error(
				`${this.name} created ${responseType} on simple response`
			);
		}
		const responseJSON: simpleResponse = {
			message: this.messageFunction(this.name, true),
		};

		return this.res.status(responseType).json(responseJSON);
	}
	// Simple response
	error(responseType: responseTypes, error: string = "unspecified error") {
		// Generating response json

		if (responseType == responseTypes.SUCCESS) {
			throw new Error(
				`${this.name} created a error response and it came out successful :)`
			);
		}
		const responseJSON: errorResponse = {
			message: this.messageFunction(this.name, false),
			error: error,
		};

		return this.res.status(responseType).json(responseJSON);
	}

	// With Data
	data(responseType: responseTypes, data: any, customName: string = "data") {
		// Generating response json

		if (responseType != responseTypes.SUCCESS) {
			throw new Error(`${this.name} created ${responseType} on data response`);
		}
		const responseJSON: dataResponse = {
			message: this.messageFunction(this.name, true),
		};
		// responseJSON.message = this.messageFunction(this.name, true);
		responseJSON[customName] = data;
		return this.res.status(responseType).json(responseJSON);
	}

	// Paginated
	page(
		responseType: responseTypes,
		data: any,
		total: number,
		itemsPerPage: number
	) {
		// Generating response json

		if (responseType != responseTypes.SUCCESS) {
			throw new Error(`${this.name} created ${responseType} on page response`);
		}

		const responseJSON: pageResponse = {
			message: this.messageFunction(this.name, true),
			data: data,
			total: total,
			total_pages: Math.ceil(total / itemsPerPage),
			items_per_page: itemsPerPage,
		};

		return this.res.status(responseType).json(responseJSON);
	}
}
