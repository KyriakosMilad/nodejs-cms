exports.getAdminPage = (req, res) => {
	res.render('admin/index', { title: 'Admin Panel', layout: 'admin' });
};

exports.getAdminCreatePost = (req, res) => {
	res.render('admin/createPost', { title: 'Admin - Create Post', layout: 'admin' });
};
