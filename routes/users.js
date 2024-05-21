// 2024-05-21 create

const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
router.use(express.json);

// 1. 회원가입
router.post('/join', (req, res) => {
    res.status(201).json("회원가입");
});

// 2. 로그인
router.post('/login', (req, res) => {
    res.status(200).json("로그인");
});

router
    .route('/reset')
    .post((req, res) => {
        res.status(200).json("비밀번호 초기화 요청");
    })  // 3. 비밀번호 초기화 요청
    .put((req, res) => {
        res.status(200).json("비밀번호 초기화");
    }); // 4. 비밀번호 초기화


module.exports = router;