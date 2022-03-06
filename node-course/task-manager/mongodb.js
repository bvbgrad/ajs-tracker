const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL,
    {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if (error){
        return console.log('Unable to connect to database')
    }

    console.log('Connected to database')
    const db = client.db(databaseName)

    db.collection('users').find({name: 'Jon'}).toArray((err, users) => {
        if (err) {
            return console.log('Unable to fetch data')
        }
        console.log (users)
    })
})
