export const isAuthenticated = (reqeust) => {
	console.log('### isAuthenticated: ', reqeust.user);
	if (!reqeust.user) {
		throw Error('You need to log in to perform this action');
	}
	return;
};
