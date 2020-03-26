const Sequelize = require('sequelize');

const sequelize = require('../helpers/database');

const Post = require('./Post');

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

Post.belongsTo(User, { as: 'user', constraints: true, onDelete: 'CASCADE' });
User.hasMany(Post);

module.exports = User;
