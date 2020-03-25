const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const abort = require('./helpers/errors');
const session = require('express-session');
const flash = require('connect-flash');

const sequelize = require('./helpers/database');

const app = express();

const homeRoutes = require('./routes/home');
const adminRoutes = require('./routes/admin');

app.engine(
	'hbs',
	hbs({
		extname: 'hbs',
		defaultLayout: 'main',
		layoutsDir: __dirname + '/views/layouts'
	})
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
	session({ secret: 'my secret', resave: false, saveUninitialized: false })
);
app.use(flash());

app.use(homeRoutes);
app.use('/admin', adminRoutes);

app.use((req, res) => {
	abort(404, res);
});

sequelize
	.sync()
	.then(() => {
		console.log('Connection has been established successfully.');
		app.listen(3000);
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});
