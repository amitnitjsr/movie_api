const express = require('express');
const CountryRoute = express.Router();
const validateToken = require('../middleware').default;
const Country = require('../models/countryModel').default;

CountryRoute.use(async (req, res, next) => {
    next();
})

CountryRoute.post('/', validateToken, async (req, res, next) => {
    let requestParams = {
        pageNo: req.body.pageNo,
        pageSize: req.body.pageSize,
        name: req.body.name,
        isActive: req.body.isActive
    }
    let c;
    try {
        c = await Country.query().where(function () {
            this.orWhere('country.name', 'like', '% ' + requestParams.name + ' %')
            this.orWhere('country.is_active', requestParams.isActive);
        }).page(requestParams.pageNo - 1, requestParams.pageSize);
    } catch (error) {
        res.send(
            JSON.stringify({
                message: error.message,
                stack: error.stack
            })
        );
    }
    res.send(c);
})

export default CountryRoute;