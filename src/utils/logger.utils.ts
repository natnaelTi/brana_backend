import colors from "colors";

export function success(message = "") {
	console.log(colors.bold.green("[*] " + message));
}
export function info(message = "") {
	console.log(colors.bold.blue("[-] " + message));
}
export function warn(message = "") {
	console.log(colors.bold.yellow("[?] " + message));
}
export function error(message = "") {
	console.log(colors.bold.red("[!] " + message));
}
