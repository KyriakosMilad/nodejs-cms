const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const abort = require('./helpers/errors');
const session = require('express-session');
const mongodbSession = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const moment = require('moment');
const multer = require('multer');
const app = express();

const User = require('./models/User');

const isAuth = require('./middlewares/isAuth');

const homeRoutes = require('./routes/home');
const adminRoutes = require('./routes/admin');

const storageOptions = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		cb(null, new Date().toISOString() + '_' + file.originalname);
	}
});

const MONGO_URI = 'mongodb://127.0.0.1:27017/cms';

const sessionOptions = {
	uri: MONGO_URI,
	collection: 'sessions'
};

const sessionStore = new mongodbSession(sessionOptions);

app.engine(
	'hbs',
	hbs({
		extname: 'hbs',
		defaultLayout: 'main',
		layoutsDir: __dirname + '/views/layouts',
		helpers: {
			dateToHumans: function(date) {
				return moment(date).format('MMMM Do YYYY, h:mm:ss a');
			},
			ifNextPage: function(allPosts, postsPerPage, currentPage, options) {
				if(allPosts > postsPerPage * currentPage) {
					return options.fn(this);
				}
				return options.inverse(this);
			},
			ifBiggerThanOrEquial: function(first, secound, options) {
				if(first >= secound) {
					return options.fn(this);
				}
				return options.inverse(this);
			}
		}
	})
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: storageOptions }).single('file'));

app.use(
	session({
		secret: 'my secret',
		resave: false,
		saveUninitialized: false,
		HttpOnly: true,
		store: sessionStore
	})
);

app.use(flash());

app.use(homeRoutes);
app.use('/admin', isAuth, adminRoutes);

app.use((req, res) => {
	abort(req, res, 404);
});

mongoose
	.connect(MONGO_URI)
	.then(res => {
		User.findOne({ email: 'admin@cms.com' })
			.then(res => {
				if (res != null) {
					console.log('User Admin Found!');
				} else {
					console.log('User Admin Not Found Creating One!', res);
					const adminUser = new User({
						name: 'Kyriakos Milad',
						email: 'admin@cms.com',
						password:
							'$2b$12$cN7t12YkS.zBE4Xa9RgeVuUIPU26C0dYnl7tdZXtwEeK03dzB0wWq' // never do this, i'm just exploring nodejs
					});
					adminUser.save();
					console.log('User Admin created successfuly!');
				}
				app.listen(3000);
			})
			.catch(err => {
				console.log(err);
			});
	})
	.catch(err => {
		console.log(err);
	});
