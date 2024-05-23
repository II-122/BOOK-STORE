// 2024-05-24 create

const express = require('express');
const router = express.Router();
const {
    allCategory
} = require('../controller/CategoryController.js')


router.use(express.json());

router.get('/', allCategory);    // 1. 카테고리 조회

module.exports = router;