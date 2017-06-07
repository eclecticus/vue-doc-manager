require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DEV_URL,
    dialect: 'postgres',
    migrationStoragePath: 'sequelizeMeta.json',
  },
  test: {
    url: process.env.TEST_URL,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
  travis: {
    use_env_variable: 'DATABASE_URL',
  },
};
