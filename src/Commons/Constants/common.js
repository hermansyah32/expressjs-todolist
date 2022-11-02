export const APP_NAME = process.env.APP_NAME;
export const APP_PORT = process.env.APP_PORT ?? 5000;

export const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY || 'secret';
export const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY || 'secret';

export const REFRESH_TOKEN_EXPIRE = 30 * 24 * 60 * 60; // 30 days in seconds
export const ACCESS_TOKEN_EXPIRE = 60 * 60; // 1 hour in seconds

export const DATABASE_TYPE = process.env.DATABASE_TYPE;
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_PORT = process.env.DATABASE_PORT;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_USER = process.env.DATABASE_USER;
export const DATABASE_PASS = process.env.DATABASE_PASS;

export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_PASS = process.env.REDIS_PASS;