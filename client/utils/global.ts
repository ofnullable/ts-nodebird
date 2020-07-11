export const isProd = process.env.NODE_ENV === 'production';
export const serverAddress = isProd ? 'sample.com' : 'http://localhost:8000';
