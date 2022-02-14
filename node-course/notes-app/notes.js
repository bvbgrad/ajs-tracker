const chalk = require('chalk')
const fs = require('fs');

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (duplicateNote) {
        console.log(chalk.red.inverse("Note title taken"))
    } else {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green("New note added for '" + title + "'"))
     }
}
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue("Your Notes"))
    notes.forEach(note => {
        console.log(note.title)
    });
    return 'Your notes ...'
}

const loadNotes = () => {
    try {
        const dataJSON = fs.readFileSync('notes.json').toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        console.log('No notes file found')
        return []
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const selectedNote = notes.find((note) => note.title === title)

    if (selectedNote) {
        console.log("title: '" + chalk.blue(selectedNote.title) + "' body: '" + selectedNote.body + "'")
    } else {
        console.log(chalk.red.inverse("Note not found"))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const keepNotes = notes.filter((note) => note.title !== title)
    
    const notesToRemove = notes.length - keepNotes.length
    if (notesToRemove === 0) {
        console.log(chalk.red("No note found with title = '" + title + "'"))
        console.log("No action taken")
    } else {
        saveNotes(keepNotes)
        console.log(chalk.green("Removed note with title: '" + title + "'"))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes, null, 2)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
    addNote: addNote,
    listNotes: listNotes,
    readNote: readNote,
    removeNote: removeNote
}
