const express = require('express');
const router = express.Router();

const { check, body } = require('express-validator');

const User = require('../models/User');

const adminController = require('../controllers/adminController');
const adminUsersController = require('../controllers/adminUsersController');

router.get('/admin', adminController.getAdminPage);
router.get('/admin/posts/create', adminController.getAdminCreatePost);

router.get('/admin/users', adminUsersController.getUsersPage);
router.get('/admin/users/create', adminUsersController.getCreateUser);
router.post(
	'/admin/users/create',
	check('name')
		.isLength({ min: 3, max: 18 })
		.withMessage('name field must be 3 letters min and 18 max'),
	check('email')
		.isEmail()
		.withMessage('make sure entering a valid email'),
	body('email').custom(val => {
		return User.findOne({ where: { email: val } }).then(user => {
			if (user) {
				return Promise.reject('E-mail already in use');
			}
		});
	}),
	check('password')
		.isLength({ min: 5, max: 64 })
		.withMessage('Password must be 5 digits min and 64 max'),
	adminUsersController.createUser
);

module.exports = router;
