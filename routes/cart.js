// 2024-05-21 create

const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
router.use(express.json);

router
    .route('/')
    .post((req, res) => {
        res.status(200).json("장바구니 담기");
    })  // 1. 장바구니 담기
    .get((req, res) => {
        res.status(200).json("장바구니 조회");
    }); // 2. 장바구니 조회

// 3. 장바구니 도서 삭제
router.delete('/:param_bookId', (req, res) =>{
    res.status(200).json("장바구니 도서 삭제");
});

// 4. 장바구니에서 선택한 주문 예상 상품 목록 조회
// router.get('/?', (req, res) => {
//     res.status(200).json("장바구니에서 선택한 주문 예상 상품 목록 조회");
// });

module.exports = router;