module.exports = (err, res) => {
	if (err === 403) {
		return res.status(403).render('error', { title: 'Error 403 forbidden.' });
	}

	if (err === 401) {
		return res
			.status(401)
			.render('error', { title: 'Error 401 unauthorized.' });
	}

	if (err === 500) {
		return res.status(500).render('error', { title: 'Server Error 500.' });
	}

	return res
		.status(404)
		.render('error', { title: 'Error 404 page not found.' });
};
