import InitJWT from "./jwt.utils.js";
import InitOAuth from "./oauth.utils.js";
import runSerializer from "./serialize.util.js";

export default function setupPassport() {
	runSerializer();
	InitJWT();
	InitOAuth();
}
