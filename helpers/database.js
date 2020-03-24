const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs', 'root', '', {
	dialect: 'mysql',
	host: 'localhost'
});

module.exports = sequelize;
