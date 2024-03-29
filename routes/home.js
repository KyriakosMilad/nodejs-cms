const express = require('express');
const router = express.Router();

const isAuth = require('../middlewares/isAuth');

const { check, body } = require('express-validator');

const User = require('../models/User');
const homeController = require('../controllers/homeController');

router.get('/', homeController.getHomePage);
router.get('/login', homeController.getLoginPage);
router.post(
	'/login',
	check('email')
		.exists()
		.isEmail()
		.withMessage('make sure entering valid email'),
	body('email').custom(val => {
		return User.find({ email: val }).then(user => {
			if (user == null) {
				return Promise.reject('make sure entering valid email');
			}
		});
	}),
	check('password')
		.exists()
		.withMessage('make sure entering valid password'),
	homeController.login
);
router.post('/logout', isAuth, (req, res) => {
	req.session.user = null;
	req.session.isAuth = false;
	req.session.destroy();
	res.clearCookie('connect.sid', { path: '/' });
	res.redirect('/');
});

router.get('/posts/:postid', homeController.getPostPage);

module.exports = router;
