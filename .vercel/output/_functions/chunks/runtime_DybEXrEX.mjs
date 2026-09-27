import { s as EnvInvalidVariables, tt as AstroError } from "./errors-data_DOtOq1ss.mjs";
//#region node_modules/.pnpm/astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/env/errors.js
function invalidVariablesToError(invalid) {
	const _errors = [];
	for (const { key, type, errors } of invalid) if (errors[0] === "missing") _errors.push(`${key} is missing`);
	else if (errors[0] === "type") _errors.push(`${key}'s type is invalid, expected: ${type}`);
	else _errors.push(`The following constraints for ${key} are not met: ${errors.join(", ")}`);
	return _errors;
}
//#endregion
//#region node_modules/.pnpm/astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/env/runtime.js
var _getEnv = (key) => process.env[key];
function setGetEnv(fn) {
	_getEnv = fn;
	_onSetGetEnv();
}
var _onSetGetEnv = () => {};
function setOnSetGetEnv(fn) {
	_onSetGetEnv = fn;
}
function getEnv(...args) {
	return _getEnv(...args);
}
function createInvalidVariablesError(key, type, result) {
	return new AstroError({
		...EnvInvalidVariables,
		message: EnvInvalidVariables.message(invalidVariablesToError([{
			key,
			type,
			errors: result.errors
		}]))
	});
}
//#endregion
export { setOnSetGetEnv as i, getEnv as n, setGetEnv as r, createInvalidVariablesError as t };
