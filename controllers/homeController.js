const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.getHomePage = (req, res) => {
	res.render('home/index', {
		title: 'Homepage -- all posts',
		isAuth: req.session.isAuth
	});
};

exports.getLoginPage = (req, res) => {
	res.render('home/login', {
		title: 'Login',
		old: {
			email: null,
			password: null
		}
	});
};

exports.login = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).render('home/login', {
			title: 'Login',
			errMsg: errors.array()[0].msg,
			old: {
				email: req.body.email,
				password: req.body.password
			}
		});
	}
	User.findOne({ email: req.body.email }).then(user => {
		bcrypt.compare(req.body.password, user.password, (err, result) => {
			if (!result) {
				return res.status(422).render('home/login', {
					title: 'Login',
					errMsg: 'make sure entering valid password',
					old: {
						email: req.body.email,
						password: req.body.password
					}
				});
			} else {
				req.session.isAuth = true;
				req.session.user = user;
				req.session.save(err => {
					if (err) {
						console.log(err);
						return res.status(400).render('home/login', {
							title: 'Login',
							errMsg: 'something went wrong try again',
							old: {
								email: req.body.email,
								password: req.body.password
							}
						});
					} else {
						req.flash('done', 'logged you in successfuly!');
						return res.redirect('/admin');
					}
				});
			}
		});
	});
};
