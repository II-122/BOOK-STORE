// 2024-05-27 create

const conn = require('../mariadb.js');
const { StatusCodes } = require('http-status-codes');
// const { body, param, validationResult } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

const addLike = (req, res) => {
    const { param_bookId } = req.params;
    const { users_id } = req.body;

    let sql = `INSERT INTO likes (likes_userId, likes_bookId) VALUES (?, ?)`;
    let values = [users_id, param_bookId];
    conn.query(sql, values, (err, results) => {
        if(err) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.CREATED).json(results);
    });
};

const cancleLike = (req, res) => {
    const { param_bookId } = req.params;
    const { users_id } = req.body;

    let sql = `DELETE FROM likes WHERE likes_userId = ? AND likes_bookId = ?`;
    let values = [users_id, param_bookId];
    conn.query(sql, values, (err, results) => {
        if(err) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    });
};

module.exports = {
    addLike,
    cancleLike
};