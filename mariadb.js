// 2024-05-22 create

const mariadb = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mariadb.createConnection({
    host : process.env.DB_HOST,
    user : 'root',
    password : process.env.DB_PASSWORD,
    database : 'BookStore',
    // timezone : 'Asia/Seoul',
    dateStrings : true
});

module.exports = connection;
