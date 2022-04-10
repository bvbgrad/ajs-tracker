const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

// Register (create) new user
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch(err) {
        res.status(400).send(err)
    }
})

// Login a registered used and create a fresh token
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (err) {
        res.status(401).send()
    }
})

// logout
router.post ('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// logout
router.post ('/users/logoutALL', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Get my profile
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// Get a specific user by Id
router.get('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findById(_id)
        if (!user) {
            return res.status(204).send()
        }
        res.send(user)
    } catch(err) {
        res.status(500).send()
    }
})

// Delete a specific user by Id
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(204).send()
        }
        res.send(user)
    } catch(err) {
        res.status(500).send()
    }
})

// Update a specific user by Id
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            return res.status(204).send()
        }
        res.send(user)
    } catch(err) {
        res.status(500).send()
    }
})

module.exports = router