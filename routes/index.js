const express = require('express')
const router = express.Router()

const crud = require('./crud')
const products = require('./products')

module.exports = router

router.use('/crud', crud)
router.use('/products', products)