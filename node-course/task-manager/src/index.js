const express = require('express')
require('./db/mongoose')
const taskRouter = require('./routers/task')
const userRouter = require('./routers/user')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     console.log(req.method, req.path)
//     next()
// })

app.use(express.json())
app.use(taskRouter)
app.use(userRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


const User = require('./models/user')

const main = async () => {
    const user = await User.findById('6253d9b562e7ab2ccbe44a11')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()
