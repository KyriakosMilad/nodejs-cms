exports.getAdminPage = (req, res) => {
  res.render('admin/index', {title: 'Admin Panel', layout: 'admin'})
}