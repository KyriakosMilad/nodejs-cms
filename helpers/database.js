const mongodb = require('mongodb');

const sequelize = new Sequelize('nodejs', 'root', '', {
	dialect: 'mysql',
	host: 'localhost',
	logging: false
});

module.exports = sequelize;
