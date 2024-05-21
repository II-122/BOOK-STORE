// 2024-05-21 create

const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
router.use(express.json);

// 1. 전체 도서 조회
router.get('/', (req, res) => {
    res.status(200).json("전체 도서 조회");
});

// 2. 개별 도서 상세 조회
router.get('/:param_bookId', (req, res) => {
    res.status(200).json("개별 도서 상세 조회");
});

// 3. 카테고리별 (신간)도서 목록 조회
router.get('/', (req, res) => {
    res.status(200).json("카테고리별 (신간)도서 목록 조회");
});

module.exports = router;