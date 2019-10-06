const Sequelize = require('sequelize');
const config = require('config');

module.exports = new Sequelize('turingshop', 'root', '', config.get('sqlConnect'));

