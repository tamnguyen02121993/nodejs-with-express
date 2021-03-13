const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../utils/mongoose');
class MeController {
	// / [GET] /me/stored/courses
	async storedCourses(req, res, next) {
		try {
			const courses = await Course.find({});
			res.render('me/stored-courses', {
				courses: multipleMongooseToObject(courses),
			});
		} catch (error) {
			next(error);
		}
	}

	// / [GET] /me/trash/courses
	async trashCourses(req, res, next) {
		try {
			const courses = await Course.findDeleted({});
			res.render('me/trash-courses', {
				courses: multipleMongooseToObject(courses),
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new MeController();
