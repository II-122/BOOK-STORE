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
router.delete('/', removeCartItem);

// 4. 장바구니에서 선택한 주문 예상 상품 목록 조회
// router.get('/?', (req, res) => {
//     res.status(200).json("장바구니에서 선택한 주문 예상 상품 목록 조회");
// });

module.exports = router;