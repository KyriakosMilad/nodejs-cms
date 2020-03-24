const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getCreateUser = (req, res) => {
	res.render('admin/createUser', {
		title: 'Admin - Create User',
		layout: 'admin'
	});
};

exports.createUser = (req, res) => {
	bcrypt.hash(req.body.password, 12, function(err, hashedPass) {
		if (err) {
			console.log('hash err: ', err);
		} else {
			User.create({
				firstname: req.body.firstname,
				lastname: req.body.lastname,
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
