require('dotenv').config()
const express = require('express')
require('./db/mongoose')
const taskRouter = require('./routers/task')
const userRouter = require('./routers/user')

console.log("app port  : ", process.env.PORT)
console.log("app db url: ", process.env.MONGODB_URL)

const app = express()

app.use(express.json())
app.use(taskRouter)
app.use(userRouter)

module.exports = app
