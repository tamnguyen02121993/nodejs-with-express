const express = require('express');
const app = express();
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// HTTP Logger
app.use(morgan('combined'));

// Method override: POST => PUT
app.use(methodOverride('_method'));

// Template Engine
app.engine(
	'hbs',
	handlebars({
		extname: '.hbs',
		helpers: {
			sum: (a, b) => a + b,
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
