// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient

const {MongoClient, ObjectID} = require('mongodb');

// console.log(MongoClient)

const connectionURL = 'mongodb://127.0.0.1:27017'
// const databaseName = 'test'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())
console.log(id.toHexString())

MongoClient.connect(connectionURL,
    {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if (error){
        return console.log('Unable to connect to database')
    }

    console.log('Connected to database')
    const db = client.db(databaseName)



    // db.collection('users').insertMany([
    //     {
    //         name: 'Dan',
    //         age: 44
    //     },
    //     {
    //         name: 'Mike',
    //         age: 38
    //     }
    // ], (err, res) => {
    //     if (err) {
    //         return console.log('Unable to insert multiple documents')
    //     }
    //     console.log(res.ops)
    // })
    
    // db.collection('users').find(), (err, res) => {
    //     if (err) {
    //         return console.log('Unable to insert multiple documents')
    //     }
    //     console.log(res.ops)
    // }

    db.collection('users').insertOne({
        _id: id,
        name: 'Jon',
        age: 41
    }, (err, res) => {
        if (err) {
            return console.log('Unable to insert user')
        }
        console.log(res.ops)
    })

})
