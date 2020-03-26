const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const abort = require('./helpers/errors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const flash = require('connect-flash');
const sequelize = require('./helpers/database');
const app = express();

const User = require('./models/User');

const isAuth = require('./middlewares/isAuth');

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

const sessionOptions = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'nodejs'
};

const sessionStore = new MySQLStore(sessionOptions);

app.use(
	session({
		secret: 'my secret',
		resave: false,
		saveUninitialized: false,
		store: sessionStore
	})
);

app.use(flash());

app.use(homeRoutes);
app.use('/admin', isAuth, adminRoutes);

app.use((req, res) => {
	abort(req, res, 404);
});

sequelize
	// .sync({ force: true })
	.sync()
	.then(() => {
		// User.create({
		// 	name: 'Kyriakos Milad',
		// 	email: 'k@k.a',
		// 	password: '$2b$12$cN7t12YkS.zBE4Xa9RgeVuUIPU26C0dYnl7tdZXtwEeK03dzB0wWq'
		// });
		console.log('Connection has been established successfully.');
		app.listen(3000);
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});
