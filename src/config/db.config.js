require("dotenv").config();

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "mocktest100?",
  DB: "project_management_db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
