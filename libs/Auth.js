import Request from "./Request.js"

class Auth extends Request {

	constructor(...args) {
		super(...args);
	}

	/**
	 * Авторизация через rest api
	 *
	 * @param login
	 * @param password
	 * @param callback
	 * @returns {Promise<*>}
	 */
	async inRest ({login, password}, callback = response => response) {
		return await this.send('user/auth', {
			login: login,
			password: password,
			remember: true,
			silent: false,
		}, callback)
	}

}

export default Auth