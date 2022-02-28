'use strict';

const express = require('express')
const router = express.Router()
const cartRouter = require('./cart')
const productRouter = require('./product')
const profileRouter = require('./profile')
const Controller = require('../controllers/homeController')

router.get('/', Controller.landingPage)

router.use('/product',productRouter)
router.use('/cart',cartRouter)
router.use('/profile',profileRouter)

module.exports =router