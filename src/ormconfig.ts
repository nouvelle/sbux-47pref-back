module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
  entities: ['./src/entities/*.entity.ts'],
  migrations: ['./src/migrations/*.ts'],
  seeds: ['src/seeds/*.ts'],
  cli: {
    entitiesDir: './src/entities',
    migrationsDir: './src/migrations',
  },
};
