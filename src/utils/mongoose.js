module.exports = {
	multipleMongooseToObject: (mongooseArray) => {
		return mongooseArray.map((mongoose) => mongoose.toObject());
	},
	mongooseToObject: (mongoose) => mongoose.toObject(),
};
