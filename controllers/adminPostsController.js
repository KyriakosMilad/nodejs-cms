const Post = require('../models/Post');
const abort = require('../helpers/errors');
const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

exports.getAdminPosts = (req, res) => {
	Post.find()
		.populate('userId')
		.lean()
		.then(posts => {
			return res.render('admin/posts/allPosts', {
				title: 'Admin - All Posts',
				layout: 'admin',
				isAuth: req.session.isAuth,
				authUser: req.session.authUser,
				doneMsg: req.flash('doneMsg'),
				errMsg: req.flash('errMsg'),
				posts: posts
			});
		})
		.catch(err => {
			console.log(err);
			abort(req, res, 500);
		});
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
	const newPost = new Post({
		title: req.body.title,
		bio: req.body.bio,
		userId: req.session.user._id,
		imageUrl: req.file.filename
	});
	newPost
		.save()
		.then(post => {
			fs.rename(
				path.join(__dirname, '../', 'images', post.imageUrl),
				path.join(__dirname, '../', 'public', 'images', 'posts', post.imageUrl),
				err => {
					if (err) {
						console.log('file rename error: ', err);
						Post.findByIdAndDelete(post._id);
						req.flash('errMsg', "Post Didn't publish, try again!");
						return res.redirect('/admin/posts');
					}
					req.flash('doneMsg', 'Post Created Successfuly');
					return res.redirect('/admin/posts');
				}
			);
		})
		.catch(err => {
			console.log(err);
			abort(req, res, 500);
		});
};

exports.deletePost = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log('err found ', errors.array());
		req.flash('errMsg', errors.array()[0].msg);
		return res.redirect('/admin/posts');
	}
	Post.findByIdAndDelete(req.body.id)
		.then(post => {
			req.flash('doneMsg', 'Post Deleted Successfuly');
			return res.redirect('/admin/posts');
		})
		.catch(err => {
			console.log(err);
			abort(req, res, 500);
		});
};
