import io from 'socket.io-client'
import cookie from 'socket.io-client-cookies-headers'

import Auth from './libs/Auth.js'

// main func
(async () => {
	const auth = new Auth();
	const response = await auth.inRest({login: '', password: ''});
	// Вместо callback response => response можешь свою обработку результатов сделать, а это - similar костыль
	const cookie = auth.getCookie('forum_auth');

	if (response.status !=='success') {
		return response.status
	}

	const socket = io('https://dota2.ru', {
		reconnectionAttemps: 10,
		reconnectionDelay: 5e3,
		extraHeaders: {
			Cookie: `forum_auth=${cookie}`
		}
	});

	socket.on('connect', () => {
		console.log(`User with id ${socket.id} - connected!`);
	});

	socket.on('notification', console.log);
})()