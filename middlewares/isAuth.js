const abort = require('../helpers/errors');

module.exports = (req, res, next) => {
	if (!req.session.isAuth) {
		return abort(403, res);
	}
	next();
};
