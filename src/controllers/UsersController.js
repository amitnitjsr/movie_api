const express = require('express');
const UsersRoute = express.Router();
const users = require('../models/usersModel').default;
const validateToken = require('../middleware').default;

UsersRoute.use(async (req, res, next) => {
    next();
})

UsersRoute.get('/', validateToken, async (req, res, next) => {
    let u;
    try {
        u = await users.query().eager('[usersType]');
    } catch (error) {
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
    res.send(u);
})

UsersRoute.get('/:id', validateToken, async (req, res, next) => {
    let u;
    try {
        u = await users.query().skipUndefined().findById(req.param.id).eager('[usersType]');
    } catch (error) {
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
    res.send(u);
})

export default UsersRoute;