// 2024-05-21 create

const express = require('express');
const router = express.Router();
const {
    addLike,
    cancleLike
} = require('../controller/LikesController.js');

router.use(express.json());

router
    .route('/:param_bookId')
    .post(addLike)  // 1. 좋아요 추가
    .delete(cancleLike); // 2. 좋아요 취소

module.exports = router;