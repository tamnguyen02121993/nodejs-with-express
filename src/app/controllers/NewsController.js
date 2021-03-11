class NewsController {
	/// [GET] /news/:slug
	show(req, res) {
		res.send('news detail');
	}

	/// [GET] /news
	index(req, res) {
		res.render('news');
	}
}

module.exports = new NewsController();
