'use strict';

const express = require('express')
const cartRouter = express.Router()
const ControllerCart = require('../controllers/cartController');

cartRouter.get('/', ControllerCart.getCart)
cartRouter.post('/', ControllerCart.postToCart)

cartRouter.get('/checkout', ControllerCart.updateCheckOut)
cartRouter.get('/delete/:id', ControllerCart.deleteCart)

module.exports =cartRouter
