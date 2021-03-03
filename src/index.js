const express = require('express')
const app = express();
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const path = require('path')
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));


// HTTP Logger
app.use(morgan('combined'));

// Template Engine
app.engine('hbs', handlebars({extname: ".hbs"}));
app.set("view engine", "hbs");
app.set('views', path.join(__dirname, "resources/views"))

app.get('/', (req, res) => {
    res.render("home")
})

app.listen(port, () => {
    console.log(`Example app running at http://localhost:${port}`);
})