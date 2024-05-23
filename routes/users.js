// 2024-05-21 create

const express = require('express');
const router = express.Router();
const {
    join,
    login,
    pwResetRequest, 
    pwReset
} = require('../controller/UserController.js');

router.use(express.json());

router.post('/join', join); // 1. 회원가입

router.post('/login', login);   // 2. 로그인

router
    .route('/reset')
    .post(pwResetRequest)  // 3. 비밀번호 초기화 요청
    .put(pwReset); // 4. 비밀번호 초기화

module.exports = router;