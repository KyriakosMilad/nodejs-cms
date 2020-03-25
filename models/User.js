const Sequelize = require('sequelize');

const sequelize = require('../helpers/database');

const User = sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNUll: false
	},
	email: {
		type: Sequelize.STRING,
		allowNUll: false
	},
	password: {
		type: Sequelize.STRING,
		allowNUll: false
	}
});

module.exports = User;