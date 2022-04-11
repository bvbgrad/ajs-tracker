const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    // console.log('auth middleware')
    // console.log(JSON.stringify(req.headers))
    try {
        const token = req.headers["authorization"].replace('Bearer ', '')
        // console.log("token: " + token)
        decoded = jwt.verify(token, 'thisismysecret')
        // console.log("decoded Id: " + decoded._id)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' })
    }
}

module.exports = auth
