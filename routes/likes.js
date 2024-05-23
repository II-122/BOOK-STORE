// 2024-05-21 create

const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
router.use(express.json());

router
    .route('/:param_bookId')
    .post((req, res) => {
        res.status(200).json("좋아요 추가");
    })  // 1. 좋아요 추가
    .delete((req, res) => {
        res.status(200).json("좋아요 취소");
    }); // 2. 좋아요 취소

module.exports = router;