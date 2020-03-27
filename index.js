const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const abort = require('./helpers/errors');
const session = require('express-session');
const mongodbSession = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const app = express();

// const User = require('./models/User');

const isAuth = require('./middlewares/isAuth');

const homeRoutes = require('./routes/home');
// const adminRoutes = require('./routes/admin');

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

const MONGO_URI = 'mongodb://127.0.0.1:27017/cms';

const sessionOptions = {
	uri: MONGO_URI,
	collection: 'sessions'
};

const sessionStore = new mongodbSession(sessionOptions);

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
// app.use('/admin', isAuth, adminRoutes);

app.use((req, res) => {
	abort(req, res, 404);
});

mongoose
	.connect(MONGO_URI)
	.then(res => {
		
		console.log(res);
		app.listen(3000);
	})
	.catch(err => {
		console.log(err);
	});
