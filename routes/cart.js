// 2024-05-21 create

const express = require('express');
const router = express.Router();
const {
    addToCart,
    cartItems,
    removeCartItem
} = require('../controller/CartController.js');
router.use(express.json());

router
    .route('/')
    .post(addToCart)  // 1. 장바구니 담기
    .get(cartItems); // 2. 장바구니 아이템 목록 조회 / 3. 선택된 장바구니 아이템 목록 조회

// 3. 장바구니 도서 삭제
router.delete('/:param_cartItemId', removeCartItem);

module.exports = router;