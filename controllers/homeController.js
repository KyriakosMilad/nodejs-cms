exports.getHomePage = (req, res) => {
    res.render('home/index', { title: 'Homepage -- all posts' });
}