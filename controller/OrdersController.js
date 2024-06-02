// 2024-05-29 create

const conn = require('../mariadb.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');   // node.js 내장 모듈 : 암호화
const { StatusCodes } = require('http-status-codes');
// const { body, param, validationResult } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

const order = async (req, res) => {
    const mariadb = require('mysql2/promise');
    const conn = await mariadb.createConnection({
        host : process.env.DB_HOST,
        user : 'root',
        password : process.env.DB_PASSWORD,
        database : 'BookStore',
        // timezone : 'Asia/Seoul',
        dateStrings : true
    });

    const { items, delivery, firstBookTitle, totalQuantity, totalPrice, userId } = req.body;

    let sql = `INSERT INTO delivery (delivery_address, delivery_receiver, delivery_contact) VALUES (?, ?, ?);`;
    let values= [delivery.delivery_address, delivery.delivery_receiver, delivery.delivery_contact];
    let [results] = await conn.execute(sql, values);

    let deliveryId = results.insertId;
    
    sql = `INSERT INTO orders (orders_bookTitle, orders_totalQuantity, orders_totalPrice, orders_userId, orders_deliveryId)
             VALUES (?, ?, ?, ?, ?);`;
    values = [firstBookTitle, totalQuantity, totalPrice, userId, deliveryId];
    [results] = await conn.execute(sql, values);
    let orderId = results.insertId;
    
    // orderedBook 테이블에 데이터 삽입
    sql = `INSERT INTO orderedBook (orderedBook_orderId, orderedBook_bookId, orderedBook_quantity) VALUES ?`;
    values = [];
    items.forEach((item) => {
        values.push([orderId, item.cartItem_bookId, item.cartItem_quantity]);
    });
    results = await conn.query(sql, [values]);

    let result = await removeOrders(conn, items);
    
    return res.status(StatusCodes.OK).json(result);
};

const removeOrders = async (conn, items) => {
    let sql = `DELETE FROM cartItems WHERE cartItems_id IN (?)`;
    let values = [];
    items.forEach((item) => {
        values.push(item.cartItem_id);
    });
    console.log(values);

    return result = await conn.query(sql, [values]);
};

const orders = (req, res) => {
    // const { userId } = req.body;

    let sql = `SELECT orders_id, orders_created_at, delivery_address, delivery_receiver, delivery_contact,
                 orders_bookTitle, orders_totalQuantity, orders_totalPrice
                 FROM orders LEFT JOIN delivery
                 ON orders_deliveryId = delivery_id`;
    conn.query(sql, (err, results) => {
        if(err) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    });
};

const orderDetail = (req, res) => {
    const { param_orderId } = req.params;

    let sql = `SELECT books_id, books_title, books_author, books_price, orderedBook_quantity
                 FROM orderedBook LEFT JOIN books
                 ON orderedBook_bookId = books_id
                 WHERE orderedBook_orderId = ?`;
    conn.query(sql, param_orderId, (err, results) => {
        if(err) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    });
};

module.exports = {
    order,
    orders,
    orderDetail
};