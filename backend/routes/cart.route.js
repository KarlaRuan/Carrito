var express = require('express');
const cartRoute = express.Router();

// Student model
let CartModel = require('../models/Cart');

cartRoute.route('/').get((req, res) => {
    CartModel.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

cartRoute.route('/add-cart').post((req, res, next) => {

    CartModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

cartRoute.route('/update-cart/:id').post((req, res, next) => {
    CartModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('Student successfully updated!')
        }
    })
})

cartRoute.route('/delete-cart/:id').delete((req, res, next) => {
    CartModel.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = cartRoute;
