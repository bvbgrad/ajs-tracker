const fs = require('fs');

const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday'
}

const dataJSON = fs.readFileSync('1-json.json').toString()
console.log(dataJSON)
const profileData = JSON.parse(dataJSON)

profileData.name = 'Brent'
profileData.age = '71'
console.log(profileData)

const profileJSON = JSON.stringify(profileData, null, 2)
fs.writeFileSync('1-json.json', profileJSON)


// const bookJSON = JSON.stringify(book, null, 2)
// fs.writeFileSync('1-json.json', bookJSON)

// const dataJSON = fs.readFileSync('1-json.json').toString()
// console.log(dataJSON)
// const bookData = JSON.parse(dataJSON)
// console.log(bookData.title)

// console.log(bookJSON)

// const parseData = JSON.parse(bookJSON)
// console.log(parseData.author)
