// 2024-05-22 create

const conn = require('../mariadb.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');   // node.js 내장 모듈 : 암호화
const { StatusCodes } = require('http-status-codes');
const { body, param, validationResult } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

const join = (req, res) => {
    const { users_email, users_password } = req.body;
    // 비밀번호 암호화
    const salt = crypto.randomBytes(10).toString('base64');
    const hashedPw = crypto.pbkdf2Sync(users_password, salt, 10000, 10, 'sha512').toString('base64');

    console.log(users_email + " " + hashedPw);
    let sql = "INSERT INTO users (users_email, users_password, users_salt) VALUES (?, ?, ?)";
    let values = [users_email, hashedPw, salt];
    console.log(salt);
    conn.query(sql, values, 
        (err, results) => {
            if(err){
                return res.status(StatusCodes.BAD_REQUEST).end();   // bad request
            }

            return res.status(StatusCodes.CREATED).json(results);
        }
    )
};

const login = (req, res) => {
    const { users_email, users_password } = req.body;
    let sql = "SELECT * FROM users WHERE users_email = ?";
    let values = users_email;
    conn.query(sql, values,
        (err, results) => {
            if(err){
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            const loginUser = results[0];

            // pw 검사
            const hashedPw = crypto.pbkdf2Sync(users_password, loginUser.users_salt, 10000, 10, 'sha512').toString('base64');

            if(loginUser && loginUser.users_password == hashedPw) {
                // 토큰 발행
                const token = jwt.sign({
                    email : loginUser.users_email
                }, process.env.JWT_PRIVATE_KEY, {
                    expiresIn : '30m',
                    issuer : "admin"
                });

                // 토큰 쿠키에 담기
                res.cookie("token", token,{
                    httpOnly : true
                });

                return res.status(StatusCodes.OK).json(results);
            } else {
                // status 401 : unauthorized ( 인증되지 않음 )
                // status 403 : forbidden ( 접근 권리 없음 )
                return res.status(StatusCodes.UNAUTHORIZED).end();
            }
        }
    )
};

const pwResetRequest = (req, res) => {
    const { users_email } = req.body;
    
    let sql = "SELECT * FROM users WHERE users_email = ?";
    conn.query(sql, users_email,
        (err, results) => {
            if(err) {
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            const user = results[0];
            if(user) {
                return res.status(StatusCodes.OK).end();
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).end();
            }
        }
    )
};

const pwReset = (req, res) => {
    const { users_email, new_password } = req.body;

    const salt = crypto.randomBytes(10).toString('base64');
    const hashedPw = crypto.pbkdf2Sync(new_password, salt, 10000, 10, 'sha512').toString('base64');

    let sql = `UPDATE users SET users_password = ?, users_salt = ? WHERE users_email = ?`;
    let values = [hashedPw, salt, users_email];
    conn.query(sql, values,
        (err, results) => {
            if(err){
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            if(results.affectedRows == 0){
                return res.status(StatusCodes.BAD_REQUEST).end();
            } else {
                return res.status(StatusCodes.OK).json(results);
            }
        }
    )
};

module.exports = {
    join,
    login,
    pwResetRequest, 
    pwReset
};