const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config.js');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model.js')(sequelize, DataTypes);
db.Project = require('./project.model.js')(sequelize, DataTypes);
db.Task = require('./task.model.js')(sequelize, DataTypes);

db.User.hasMany(db.Project);
db.Project.belongsTo(db.User);

db.Project.hasMany(db.Task);
db.Task.belongsTo(db.Project);

module.exports = db;
