class SiteController {
	/// [GET] /news/:slug
	search(req, res) {
		res.render('search');
	}

	/// [GET] /
	index(req, res) {
		res.render('home');
	}
}

module.exports = new SiteController();
