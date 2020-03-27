const abort = require('../helpers/errors');

module.exports = (req, res, next) => {
	if (!req.session.isAuth) {
		return abort(req, res, 403);
	}
	next();
};
