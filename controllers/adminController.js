exports.getAdminPage = (req, res) => {
	res.render('admin/index', {
		title: 'Admin Panel',
		layout: 'admin',
		done: req.flash('done'),
		authUser: req.session.user
	});
};
