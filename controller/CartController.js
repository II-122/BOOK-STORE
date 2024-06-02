// 2024-05-28 create

const conn = require('../mariadb.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');   // node.js 내장 모듈 : 암호화
const { StatusCodes } = require('http-status-codes');
// const { body, param, validationResult } = require('express-validator');
const dotenv = require('dotenv');
const { STATUS_CODES } = require('http');
dotenv.config();

const addToCart = (req, res) => {
    const { bookId, quantity, userId } = req.body;

    let sql = `INSERT INTO cartItems (cartItems_bookId, cartItems_quantity, cartItems_userId) VALUES (?, ?, ?);`;
    let values = [bookId, quantity, userId];
    conn.query(sql, values, (err, results) => {
        if(err) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.CREATED).json(results);
    });
};

const cartItems = (req, res) => {
    const { userId, selected } = req.body;  // selected = [1, 3, 4, ...]

    let sql = `SELECT cartItems_id, books_id, books_title, books_summary, cartItems_quantity, books_price 
                 FROM cartItems LEFT JOIN books 
                 ON cartItems_bookId = books_id
                 WHERE cartItems_userId = ? AND cartItems_id IN (?);`;
    let values = [userId, selected];
    conn.query(sql, values, (err, results) => {
        if(err) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    });
};

const removeCartItem = (req, res) => {
    const { param_cartItemId } = req.params;
    const { userId } = req.body;

    let sql = `DELETE FROM cartItems WHERE cartItems_id = ? AND cartItems_userId = ?`;
    let values = [param_cartItemId, userId];
    conn.query(sql, values, (err, results) => {
        if(err) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    });
};

module.exports = {
    addToCart,
    cartItems,
    removeCartItem
};