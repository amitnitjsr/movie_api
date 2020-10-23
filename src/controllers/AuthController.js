const express = require('express');
const AuthRoute = express.Router();
let jwt = require('jsonwebtoken');
const users = require('../models/usersModel').default;

AuthRoute.use(async (req, res, next) => {
    next();
})

AuthRoute.post('/login', async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let u = await users.query().skipUndefined().where('email', email).where('password', password).eager('[]').first();
    if (email && password && u) {
        if (email === u.email && password === u.password) {
            let token = jwt.sign({ email: u.email },
                process.env.SECRET,
                {
                    expiresIn: '24h'
                }
            );
            res.json({
                success: true,
                message: 'Authentication successful!',
                token: token,
                user: u
            });
        } else {
            res.send(403).json({
                success: false,
                message: 'Incorrect username or password'
            });
        }
    } else {
        res.send(400).json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
})

export default AuthRoute;