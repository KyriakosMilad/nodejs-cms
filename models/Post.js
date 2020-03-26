const Sequelize = require('sequelize');

const sequelize = require('../helpers/database');

const Post = sequelize.define('post', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	title: {
		type: Sequelize.STRING,
		allowNUll: false
	},
	bio: {
		type: Sequelize.TEXT,
		allowNUll: false
	},
	image: {
		type: Sequelize.STRING,
		allowNUll: true
	}
});

module.exports = Post;
