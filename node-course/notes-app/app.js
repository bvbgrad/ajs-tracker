const validator = require('validator');
const yargs = require('yargs');

const getNotes = require('./notes.js');

const msg = getNotes()
console.log(msg)
console.log(process.argv)
console.log(yargs.argv)

// const command = process.argv[2]
// if (command === 'add') {
//     console.log('Adding note')
// } else if (command === 'remove') {
//     console.log('Removing note')
// }
