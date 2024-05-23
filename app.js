// 2024-05-21 create

const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const usersRouter = require('./routes/users.js');
const booksRouter = require('./routes/books.js');
const categoryRouter = require('./routes/category.js');
const likesRouter = require('./routes/likes.js');
const cartRouter = require('./routes/cart.js');
const ordersRouter = require('./routes/orders.js');

app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/category', categoryRouter);
app.use('/likes', likesRouter);
app.use('/cart', cartRouter);
app.use('/orders', ordersRouter);

app.listen(process.env.PORT, () => {
    console.log("server working...");
});