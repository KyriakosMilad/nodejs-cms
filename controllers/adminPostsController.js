exports.getAdminCreatePost = (req, res) => {
	res.render('admin/posts/createPost', {
		title: 'Admin - Create Post',
		layout: 'admin'
	});
};
