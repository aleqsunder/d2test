import fetch from 'node-fetch'

class Request {

	constructor () {
		this.api = "https://dota2.ru/forum/api/"
	}

	/**
	 * Куки после запросов
	 *
	 * @type {{}}
	 */
	cookie = {};

	/**
	 * Отправка запроса
	 *
	 * @param url
	 * @param data
	 * @param callback
	 * @returns {Promise<any>}
	 */
	async send (url, data = {}, callback = () => {}) {
		return await fetch(this.api + url, {
			credentials: "same-origin",
			headers: {
				"accept": "application/json, text/javascript, */*; q=0.01",
				"accept-language": "ru,en;q=0.9",
				"content-type": "application/json",
				"x-requested-with": "XMLHttpRequest",
			},
			body: JSON.stringify(data),
			method: "POST",
		}).then(res => {
			this.cookie = {};

			[...res.headers.get('set-cookie').split(['; '])].map(a => {
				let str = a.split('=');

				if (str[0].split(',').length > 1) {
					str[0] = str[0].split(', ')[1];
				}

				this.cookie[str[0]] = str[1];
			});

			return res.json();
		}).then(callback);
	}

	/**
	 * Возвращает нужные cookie
	 *
	 * @param name
	 * @returns {*|boolean}
	 */
	getCookie (name) {
		return this.cookie[name] || false
	}

}

export default Request