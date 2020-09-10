const express = require('express')
const router = express.Router()

const db = require('../db')

module.exports = router

router.get('/', async (req, res) => {
    
    const results = await db.select().table('products')    
    res.send(results)
})


router.get('/:id', async (req, res) => {    
    const {id} = req.params
    const results = await db('products').where({id})    
    res.send(results)
})

router.post('/', async (req, res) => {
    const {name, price} = req.body

    if(!name) {
        res.status(400).send("Please add a name.")
    }

    if(!price){
        res.status(400).send("Please add a price.")
    }

    const result = await db('products').insert({name, price}).returning('*')
    res.send(result)
})

router.put('/:id', async (req, res) => {
    const {id} = req.params
    const {name, price} = req.body

    let toUpdate = {}
    if(!name && !price){
        return res.status(400).send("Please add a name or a price")
    }

    if(name){
        toUpdate.name = name
    }

    if(price){
        toUpdate.price = price
    }

    const updated = await db('products')
        .where('id', '=', id)
        .update(toUpdate)
        .returning('*')

    res.send(updated)


})

router.delete('/:id', async (req, res) => {
    const {id} = req.params

    const result = await db('products')
        .where('id', '=', id)
        .del()
        .returning('*')

    res.send(result)
})