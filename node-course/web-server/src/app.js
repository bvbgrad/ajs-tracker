const path = require('path');
const express = require('express');

const publicDirectoryPath = path.join(__dirname, '../public')

const app = express()
app.use(express.static(publicDirectoryPath))

console.log(__dirname)
console.log(__filename)

app.get('/weather', (req, res) => {
    res.send({
        tag1: 'tag1',
        tag2: 1234
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
