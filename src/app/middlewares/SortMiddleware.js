function SortMiddleware(req, res, next) {
	res.locals._sort = {
		enable: false,
		type: 'default',
	};

	if (req.query.hasOwnProperty('_sort')) {
		res.locals._sort = {
			enable: true,
			type: req.query.type,
			field: req.query.field,
		};
	}

	next();
}

module.exports = SortMiddleware;
