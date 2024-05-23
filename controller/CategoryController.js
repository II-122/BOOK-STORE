// 2024-05-24 create

const conn = require('../mariadb.js');
const { StatusCodes } = require('http-status-codes');
// const { body, param, validationResult } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

const allCategory = (req, res) => {
    let sql = "SELECT * FROM category";
        conn.query(sql, (err, results) => {
            if(err) {
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            
            return res.status(StatusCodes.OK).json(results);
        });
};

module.exports = {
    allCategory
};