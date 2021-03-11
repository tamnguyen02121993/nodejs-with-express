const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../utils/mongoose');
class SiteController {
	/// [GET] /news/:slug
	search(req, res) {
		res.render('search');
	}

	/// [GET] /
	async index(req, res, next) {
		try {
			const courses = await Course.find({});
			res.render('home', { courses: multipleMongooseToObject(courses) });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new SiteController();
