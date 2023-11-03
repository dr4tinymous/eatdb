require('dotenv').config();
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'defaultpassword',
      database: 'eatdb'
    },
    migrations: {
      directory: '../migrations'
    },
    seeds: {
      directory: '../seeders'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'defaultpassword',
      database: 'eatdb'
    },
    migrations: {
      directory: '../migrations'
    },
    seeds: {
      directory: '../seeders'
    }
  }
};
