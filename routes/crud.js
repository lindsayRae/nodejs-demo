const express = require('express')
const router = express.Router()

module.exports = router

/* CRUD APP */
let counter = 0

/**
 * Given a title, create an object with a sequential id
 * @param {String} title
 */
const createItem = (title, id = false) => ({
    title,
    id: id ? id : counter++
})

//Gratitude 
const items = []
console.log('items', items)
items.push(createItem('Never going to give you up'))
console.log('items', items)


router.get('/', (req, res) => {
    res.send(items)
})

router.get('/:id', (req, res) => {
    const {id} = req.params
    const found = items.find((element) => element.id == id)
    if(found){
        res.send(found)
    } else {
        res.status(404).send("No itme with such id")
    }
})

router.post('/', (req, res) => {

    const {title} = req.body
    
    if(!title){
        res.status(400).send({error: "Please add a title"})
    }

    const item = createItem(title)
    items.push(item)
    res.send(item)
})

router.delete('/:id', (req, res) => {
    const {id} = req.params
    const index = items.findIndex((element) => element.id == id)
    if(index > -1){
        const copy = {...items[index]} // copy(items[index])

        items.splice(index, 1)
        res.send(copy)
    } else {
        res.status(404).send("No item with such id")
    }
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const {title} = req.body
    
    if(!title){
        res.status(400).send("Please add a title")
    }

    const index = items.findIndex((element) => element.id == id)
    if(index > -1){
        const newItem = createItem(title, id)
        items.splice(index, 1, newItem)
        res.send(items[index])
    } else {
        res.status(400).send("No item with such id")
    }
})
