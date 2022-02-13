const chalk = require('chalk')
const fs = require('fs');
const getNotes = function () {
    return 'Your notes...'
}

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter (function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green("New note added for '" + title + "'"))
    } else {
        console.log(chalk.red.inverse("Note title taken"))
    }
}

const loadNotes = function() {
    try {
        const dataJSON = fs.readFileSync('notes.json').toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        console.log('No notes file found')
        return []
    }
}

const removeNote = function (title) {
    const notes = loadNotes()
    const keepNotes = notes.filter (function (note) {
        return note.title !== title
    })
    
    const notesToRemove = notes.length - keepNotes.length
    if (notesToRemove === 0) {
        console.log(chalk.red("No note found with title = '" + title + "'"))
        console.log("No action taken")
    } else {
        saveNotes(keepNotes)
        console.log(chalk.green("Removed note with title: '" + title + "'"))
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes, null, 2)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}
