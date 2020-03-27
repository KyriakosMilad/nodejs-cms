const User = require('../models/User');
const bcrypt = require('bcrypt');

const { validationResult } = require('express-validator');

const abort = require('../helpers/errors');

exports.getCreateUser = (req, res) => {
	res.render('admin/users/createUser', {
		title: 'Admin - Create User',
		layout: 'admin',
		old: {
			name: null,
			email: null,
			password: null
		},
		authUser: req.session.user
	});
};

exports.createUser = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(422).render('admin/users/createUser', {
			title: 'Admin - Create User',
			layout: 'admin',
			errMsg: errors.array()[0].msg,
			old: {
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			},
			authUser: req.session.user
		});
	}
	bcrypt.hash(req.body.password, 12, function(err, hashedPass) {
		if (err) {
			console.log('hash err: ', err);
			abort(req, res, 500);
		} else {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: hashedPass
			});
			newUser.save()
				.then(data => {
					req.session.flash('doneMsg', 'User Created Successfuly');
					return res.redirect('/admin/users');
				})
				.catch(err => {
					console.log(err);
					abort(req, res, 500);
				});
		}
	});
};

exports.getUsersPage = (req, res) => {
	User.findAll({
		raw: true
	})
		.then(users => {
			return res.render('admin/users/allUsers', {
				title: 'Admin - All User',
				layout: 'admin',
				users: users,
				doneMsg: req.flash('doneMsg'),
				errMsg: req.flash('errMsg'),
				authUser: req.session.user
			});
		})
		.catch(err => {
			console.log(err);
			abort(req, res, 500);
		});
};

exports.deleteUser = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		req.flash('errMsg', errors.array()[0].msg);
		return res.redirect('/admin/users');
	}
	User.findOne({ where: { id: req.body.id } })
		.then(user => {
			user
				.destroy()
				.then(user => {
					req.flash('doneMsg', 'User Deleted Successfuly');
					return res.redirect('/admin/users');
				})
				.catch(err => {
					console.log(err);
					abort(req, res, 500);
				});
		})
		.catch(err => {
			console.log(err);
			abort(req, res, 500);
		});
};
