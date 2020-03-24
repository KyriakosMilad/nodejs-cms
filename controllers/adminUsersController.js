const User = require('../models/User');

exports.getCreateUser = (req, res) => {
	res.render('admin/createUser', {
		title: 'Admin - Create User',
		layout: 'admin'
	});
};

exports.createUser = (req, res) => {
	User.create({
		firstname: 'Kyriakos',
		lastname: 'Milad',
		email: 'contact@kyriakos.me',
		password: '0123456789'
	})
		.then(data => {
			console.log(data);
			return res.redirect('/');
		})
		.catch(err => {
			console.log(err);
		});
};
