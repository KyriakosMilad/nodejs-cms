module.exports = (req, res, err) => {
	if (err === 403) {
		return res
			.status(403)
			.render('error', {
				title: 'Error 403 forbidden.',
				isAuth: req.session.isAuth
			});
	}

	if (err === 401) {
		return res
			.status(401)
			.render('error', { title: 'Error 401 unauthorized.' });
	}

	if (err === 500) {
		return res
			.status(500)
			.render('error', {
				title: 'Server Error 500.',
				isAuth: req.session.isAuth
			});
	}

	return res
		.status(404)
		.render('error', {
			title: 'Error 404 page not found.',
			isAuth: req.session.isAuth
		});
};
