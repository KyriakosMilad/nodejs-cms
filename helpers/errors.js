module.exports = (err, res) => {
	if (err === 404) {
		return res
			.status(404)
			.render('error', { title: 'Error 404 page not found.' });
	}
	if (err === 403) {
		return res.status(403).render('error', { title: 'Error 403 forbidden.' });
	}
	if (err === 401) {
		return res
			.status(401)
			.render('error', { title: 'Error 401 unauthorized.' });
	}
};
