const app = require('./app')

port = process.env.PORT
console.log("index port: ", port)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
