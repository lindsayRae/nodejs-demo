const express = require('express')
const router = express.Router()

const crypto = require('crypto')
const db = require('../db')

module.exports = router

router.post('/register', async(req, res) => {
    const {email, password} = req.body

    if(!email) {
        return res.status(400).send('Please neter an email')
    }

    if(!password){
        return res.status(400).send('Please add a password')
    }

    // From nextjs with passport demo 
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

    const already = await db('users').where({email}).first()

    if (already){
        return res.status(400).send('User already exists.')
    }

    const insert = await db('users')
        .insert({email, password: hash, salt})
        .returning(['id', 'email'])

    res.send(insert)
})