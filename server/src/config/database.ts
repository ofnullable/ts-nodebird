interface DbConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: 'postgres' | 'mysql';
}

export default {
  username: process.env.DATABASE_USERNAME!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_SCHEME!,
  host: process.env.DATABASE_HOST!,
  dialect: 'postgres' as const,
} as DbConfig;
