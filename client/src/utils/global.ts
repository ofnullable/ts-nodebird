export const isProd = process.env.NODE_ENV === 'production';
export const serverAddress = isProd ? 'http://localhost:3030' : 'http://localhost:3030';
