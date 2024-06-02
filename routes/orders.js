// 2024-05-21 create

const express = require('express');
const router = express.Router();
const {
    order,
    orders,
    orderDetail
} = require('../controller/OrdersController.js');

router.use(express.json());

router
    .route('/')
    .post(order) // 1. 결제하기 = 주문하기 = 주문 등록
    .get(orders); // 2. 주문 목록(내역) 조회

// 3. 주문 상세 상품 조회
router.get('/:param_orderId', orderDetail);

module.exports = router;