const Course = require('../models/Course');
const { mongooseToObject } = require('../../utils/mongoose');
class CoursesController {
	// / [GET] /courses/create
	create(req, res, next) {
		res.render('courses/create');
	}

	// / [POST] /courses/store
	async store(req, res, next) {
		try {
			await Course.create({
				...req.body,
				image: `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`,
			});
			res.redirect('/');
		} catch (error) {
			next(error);
		}
	}

	// / [GET] /courses/:slug
	async show(req, res, next) {
		try {
			const course = await Course.findOne({ slug: req.params.slug });
			res.render('courses/show', { course: mongooseToObject(course) });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new CoursesController();
