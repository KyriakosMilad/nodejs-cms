const User = require('../models/User');
const bcrypt = require('bcrypt');

const { validationResult } = require('express-validator');

exports.getCreateUser = (req, res) => {
	res.render('admin/createUser', {
		title: 'Admin - Create User',
		layout: 'admin',
		old: {
			name: null,
			email: null,
			password: null
		}
	});
};

exports.createUser = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(422).render('admin/createUser', {
			title: 'Admin - Create User',
			layout: 'admin',
			errMsg: errors.array()[0].msg,
			old: {
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			}
		});
	}
	bcrypt.hash(req.body.password, 12, function(err, hashedPass) {
		if (err) {
			console.log('hash err: ', err);
			return res.redirect('/');
		} else {
			User.create({
				name: req.body.name,
				email: req.body.email,
				password: hashedPass
			})
				.then(data => {
					// console.log(data);
					return res.redirect('/admin/users');
				})
				.catch(err => {
					console.log(err);
				});
		}
	});
};
