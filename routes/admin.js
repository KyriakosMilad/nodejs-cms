const express = require('express');
const router = express.Router();

const { check, body } = require('express-validator');

const User = require('../models/User');

const adminController = require('../controllers/adminController');
const adminUsersController = require('../controllers/adminUsersController');
const adminPostsController = require('../controllers/adminPostsController');

router.get('', adminController.getAdminPage);

router.get('/users', adminUsersController.getUsersPage);
router.get('/users/create', adminUsersController.getCreateUser);
router.post(
	'/users/create',
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
router.post(
	'/users/delete',
	check('id')
		.exists()
		.withMessage('something went wrong try again'),
	body('id').custom(val => {
		return User.findOne({ where: { id: parseInt(val) } }).then(user => {
			if (!user) {
				return Promise.reject('something went wrong try again');
			}
		});
	}),
	adminUsersController.deleteUser
);

router.get('/posts', adminPostsController.getAdminPosts);
router.get('/posts/create', adminPostsController.getAdminCreatePost);
router.post('/posts/create', check('title').exists().not().isEmpty().withMessage('Title required'), check('bio').exists().not().isEmpty().withMessage('Descripetion required'), adminPostsController.adminCreatePost);

module.exports = router;
