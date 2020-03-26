const Post = require('../models/Post');
const abort = require('../helpers/errors');

const { validationResult } = require('express-validator');

exports.getAdminPosts = (req, res) => {
	Post.findAll({
		// raw: true,
		include: 'user'
	})
		.then(posts => {
			console.log(posts);
			return res.render('admin/posts/allPosts', {
				title: 'Admin - All Posts',
				layout: 'admin',
				isAuth: req.session.isAuth,
				authUser: req.session.authUser,
				doneMsg: req.flash('doneMsg'),
				posts: posts
			});
		})
		.catch(err => {
			console.log(err);
			abort(req, res, 500);
		});
	// const posts = await Post.findAll({
	// 	include: 'user'
	// });
	// console.log(posts);
};

exports.getAdminCreatePost = (req, res) => {
	res.render('admin/posts/createPost', {
		title: 'Admin - Create Post',
		layout: 'admin',
		isAuth: req.session.isAuth,
		authUser: req.session.authUser,
		old: {
			title: null,
			bio: null
		},
		doneMsg: req.flash('doneMsg')
	});
};

exports.adminCreatePost = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).render('admin/posts/createPost', {
			title: 'Admin - Create Post',
			layout: 'admin',
			errMsg: errors.array()[0].msg,
			old: {
				title: req.body.title,
				bio: req.body.bio
			},
			isAuth: req.session.isAuth,
			authUser: req.session.user
		});
	}
	Post.create({
		title: req.body.title,
		bio: req.body.bio,
		userId: req.session.user.id
	})
		.then(data => {
			req.flash('doneMsg', 'Post Created Successfuly');
			return res.redirect('/admin/posts');
		})
		.catch(err => {
			console.log(err);
			abort(req, res, 500);
		});
};
