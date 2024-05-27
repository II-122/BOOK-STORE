// 2024-05-22 create

const conn = require('../mariadb.js');
const { StatusCodes } = require('http-status-codes');
// const { body, param, validationResult } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

const checkBooks = (req, res) => {
    let { categoryId, newBook, limit , currentPage } = req.query;

    // limit : Page 당 도서 수
    // offset : 0, (currentPage-1) * limit
    let offset = limit * (currentPage - 1);

    let sql = `SELECT *, (SELECT count(*) FROM likes WHERE books.books_id = likes_bookId) AS books_likes FROM books`;
    let values = [];
    if(categoryId && newBook) {
        sql += ` WHERE books_categoryId = ? AND books_pubDate BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`;
        values.push(categoryId);
    } else if (categoryId) {
        sql += ` WHERE books_categoryId = ?`;
        values.push(categoryId);
    } else if(newBook){
        sql += ` WHERE books_pubDate BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`;
    }
    sql += ` LIMIT ? OFFSET ?`;
    values.push(parseInt(limit), offset);
    
    conn.query(sql, values, (err, results) => {
        if(err) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
            
        if(results.length) {
            return res.status(StatusCodes.OK).json(results);
        } else {
            return res.status(StatusCodes.NOT_FOUND).end();
        }
    });
}; 

const checkBook = (req, res) => {
    const { users_id } = req.body;
    const param_bookId = req.params.param_bookId;
    
    let sql = `SELECT *,
	             (SELECT count(*) FROM likes WHERE books.books_id = likes_bookId) AS books_likes,
	             (SELECT EXISTS (SELECT * FROM likes WHERE likes_userId = ? AND likes_bookId = ?)) AS book_liked
	             FROM books
                 LEFT JOIN category
	             ON books.books_categoryId = category.category_id
                 WHERE books.books_id = ?`;
    let values = [users_id, parseInt(param_bookId), parseInt(param_bookId)];
    conn.query(sql, values, (err, results) => {
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