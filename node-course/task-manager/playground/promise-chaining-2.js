require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('62285e838653ebb507cafc85').then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed:false})
    return count
}

deleteTaskAndCount('623f2ede39928b120ae789f1').then((count) => {
    console.log(count)
}).catch((err) => {
    console.log(err)
})
