const Course = require('../models/Course');
const { mongooseToObject } = require('../../utils/mongoose');
class CoursesController {
	// / [GET] /courses/create
	create(req, res, next) {
		res.render('courses/create');
	}

	// / [GET] /courses/:id/edit
	async edit(req, res, next) {
		try {
			const course = await Course.findById(req.params.id);
			res.render('courses/edit', { course: mongooseToObject(course) });
		} catch (error) {
			next(error);
		}
	}

	// / [PUT] /courses/:id
	async update(req, res, next) {
		try {
			await Course.updateOne({ _id: req.params.id }, req.body);
			res.redirect('/me/stored/courses');
		} catch (error) {
			next(error);
		}
	}

	// / [DELETE] /courses/:id
	async delete(req, res, next) {
		try {
			await Course.deleteOne({ _id: req.params.id });
			res.redirect('back');
		} catch (error) {
			next(error);
		}
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
