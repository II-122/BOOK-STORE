// 2024-05-21 create

const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
router.use(express.json());

router
    .route('/')
    .post((req, res) => {
        res.status(200).json("주문하기");
    }) // 1. 결제하기 = 주문하기 = 주문 등록
    .get((req, res) =>{
        res.status(200).json("주문 목록(내역) 조회");
    }); // 2. 주문 목록(내역) 조회

// 3. 주문 상세 상품 조회
router.get('/:param_ordersId', (req, res) =>{
    res.status(200).json("주문 상세 상품 조회");
});

module.exports = router;