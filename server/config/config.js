"use strict";
exports.__esModule = true;
exports["default"] = {
    development: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_SCHEME,
        host: process.env.DATABASE_HOST,
        dialect: 'postgres'
    },
    test: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_SCHEME,
        host: process.env.DATABASE_HOST,
        dialect: 'postgres'
    },
    production: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_SCHEME,
        host: process.env.DATABASE_HOST,
        dialect: 'postgres'
    }
};
