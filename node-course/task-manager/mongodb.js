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

   db.collection('users').updateOne({
        _id: new ObjectID("62250887bff13b4d8212717f")
    }, {
        $set: {
            name: 'Joe'
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})
