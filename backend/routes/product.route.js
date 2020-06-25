var express = require('express');
const productRoute = express.Router();

// Student model
let ProductModel = require('../models/Product');

productRoute.route('/').get((req, res) => {
    ProductModel.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = productRoute;
