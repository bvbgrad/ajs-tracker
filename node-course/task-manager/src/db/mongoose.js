const mongoose = require('mongoose')
const validator = require('validator')

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'
    mongoose.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true})
    // useCreateIndex: true
// })

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            // if (!validator.isStrongPassword(value)) {
            //     throw new Error ('Password must have more than 8 characters, with at least 1 of each: lower case, upper case, number, and a symbol')
            // } 
            if (value.toLowerCase().includes('password')) {
                throw new Error ('Password can not contain "password"')
            }
            // if (!validator.isIn(value.lowercase, ['password'])) {
            //     throw new Error ('Password can not contain "password"')
            // }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }
})

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

// const task = new Task({
//     description: 'Clean windows',
//     completed: false
// })

// task.save().then(() => {
//     console.log(task)
// }).catch((error) => {
//     console.log('Error!', error)
// })

const me = new User({
    name: '   John   ',
    password: '   pass   ',
    // password: 'Pa$$1234   ',
    email: 'John@email.com    '
})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log('Error!', error)
})
