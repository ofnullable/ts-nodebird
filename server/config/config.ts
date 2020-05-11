export default {
  development: {
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_SCHEME!,
    host: process.env.DATABASE_HOST!,
    dialect: 'postgres' as const,
  },
  test: {
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_SCHEME!,
    host: process.env.DATABASE_HOST!,
    dialect: 'postgres' as const,
  },
  production: {
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_SCHEME!,
    host: process.env.DATABASE_HOST!,
    dialect: 'postgres' as const,
  },
};
