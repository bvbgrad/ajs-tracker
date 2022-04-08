require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('62285e838653ebb507cafc85', {age:1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age:1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('623efd0239928b120ae789eb', 2).then((count) => {
    console.log(count)
}).catch((err) => {
    console.log(err)
})
