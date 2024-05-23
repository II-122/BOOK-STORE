// 2024-05-22 create

const conn = require('../mariadb.js');
const { StatusCodes } = require('http-status-codes');
// const { body, param, validationResult } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

const checkBooks = (req, res) => {
    let { categoryId } = req.query;
    
    if(categoryId) {
        let sql = `SELECT * FROM books WHERE books_categoryId = ?`;
        conn.query(sql, categoryId, (err, results) => {
            if(err) {
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            
            if(results.length) {
                return res.status(StatusCodes.OK).json(results);
            } else {
                return res.status(StatusCodes.NOT_FOUND).end();
            }
        });
    } else {
        let sql = "SELECT * FROM books";
        conn.query(sql, (err, results) => {
            if(err) {
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            return res.status(StatusCodes.CREATED).json(results);
        });
    }
};

const checkBook = (req, res) => {
    const { param_bookId } = req.params;
    
    let sql = "SELECT * FROM books WHERE books_id = ?";
    conn.query(sql, param_bookId, (err, results) => {
        if(err) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
            
        if(results[0]) {
            return res.status(StatusCodes.OK).json(results[0]);
        } else {
            return res.status(StatusCodes.NOT_FOUND).end();
        }
    });
};

module.exports = {
    checkBooks,
    checkBook
};