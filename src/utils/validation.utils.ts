export enum ValidationTypes {
	TEXT,
	LONG_TEXT,
	INT,
	BOOLEAN,
	FLOAT,
	EMAIL,
	PASSWORD,
}

const missingTextGen = (field: string): string => {
	return `${field} is missing`;
};

function validateText(value: any, field: string): string {
	if (!(typeof value == "string")) {
		return `${field} is not of type string`;
	}
	// Text cannot be over length 256
	if (value.length >= 256) {
		return `${field} cannot be over 256 length`;
	}
	return null;
}
function validateLongText(value: any, field: string): string {
	if (!(typeof value == "string")) {
		return `${field} is not of type string`;
	}
	// Text cannot be over length 256
	if (value.length >= 1024) {
		return `${field} cannot be over 1024 length`;
	}
	return null;
}

function validateInt(value: any, field: string): string {
	if (!(typeof value == "number")) {
		return `${field} is not a int`;
	}
	if (!(value % 1 === 0)) {
		return `${field} cannot be a float`;
	}
	return null;
}
function validateFloat(value: any, field: string): string {
	if (!(typeof value == "number")) {
		return `${field} is not a float`;
	}
	return null;
}
function validateBoolean(value: any, field: string): string {
	if (!(typeof value == "boolean")) {
		return `${field} is not a boolean`;
	}
	return null;
}
function validateEmail(value: any, field: string): string {
	const validText = validateText(value, field);
	if (validText) {
		return validText;
	}
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
		return `${field} format not correct`;

	return null;
}
function validatePassword(value: any, field: string): string {
	const validText = validateText(value, field);
	if (validText) {
		return validText;
	}

	if (value.length < 8) {
		return `${field} needs to be longer than 8 characters`;
	}

	return null;
}
export function validateField(
	json,
	field: string,
	validationType: ValidationTypes,
	nullable: boolean
) {
	if (!json[field]) {
		if (!nullable) {
			return missingTextGen(field);
		}
		return null;
	}
	switch (validationType) {
		case ValidationTypes.TEXT:
			return validateText(json[field], field);
		case ValidationTypes.LONG_TEXT:
			return validateLongText(json[field], field);
		case ValidationTypes.INT:
			return validateInt(json[field], field);
		case ValidationTypes.FLOAT:
			return validateFloat(json[field], field);
		case ValidationTypes.BOOLEAN:
			return validateBoolean(json[field], field);
		case ValidationTypes.EMAIL:
			return validateEmail(json[field], field);
		case ValidationTypes.PASSWORD:
			return validatePassword(json[field], field);
		default:
			return null;
	}
}
