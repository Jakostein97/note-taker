const router = require('express').Router();
const { text } = require('express');
const fs = require('fs');
const { title } = require('process');
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            let noteData = JSON.parse(data)
            res.json(noteData)
        }
    })
})

router.post('/', (req, res) => {
    const noteData = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'))
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    }
    noteData.push(newNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(noteData))
    res.json(noteData)
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const noteData = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'))
    const filteredNotes = noteData.filter(note => note.id !== id);
  
    fs.writeFileSync('./db/db.json', JSON.stringify(filteredNotes));
  
    res.json({ message: 'Note deleted successfully!' });
  })

//router.delete need to use query parameter /:id and need to assign an id to the new note   
module.exports = router;