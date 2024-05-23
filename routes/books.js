// 2024-05-21 create

const express = require('express');
const router = express.Router();
const {
    checkBooks,
    checkBook
} = require('../controller/BookController.js');

router.use(express.json());

router.get('/', checkBooks);    // 1. 전체 도서 조회 & 3. 카테고리별 (신간)도서 목록 조회

router.get('/:param_bookId', checkBook);    // 2. 개별 도서 상세 조회

module.exports = router;