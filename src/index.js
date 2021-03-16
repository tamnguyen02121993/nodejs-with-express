const express = require('express');
const app = express();
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// HTTP Logger
app.use(morgan('combined'));

// Method override: POST => PUT
app.use(methodOverride('_method'));

// Custom middlewares
app.use(SortMiddleware);

// Template Engine
app.engine(
	'hbs',
	handlebars({
		extname: '.hbs',
		helpers: {
			sum: (a, b) => a + b,
			sortable: (field, sortObj) => {
				const sortType =
					field === sortObj.field ? sortObj.type : 'default';

				const icons = {
					default: 'fas fa-sort',
					asc: 'fas fa-sort-up',
					desc: 'fas fa-sort-down',
				};

				const types = {
					default: 'desc',
					asc: 'desc',
					desc: 'asc',
				};

				const icon = icons[sortType];
				const type = types[sortType];
				return `<a href="?_sort&field=${field}&type=${type}"><i class="${icon}"></i></a>`;
			},
		},
	}),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Connect Mongo DB
db.connect();

// Routes init
route(app);

app.listen(port, () => {
	console.log(`App running at http://localhost:${port}`);
});
