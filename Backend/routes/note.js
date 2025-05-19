const express = require("express");
const { body, validationResult } = require("express-validator");
const fetchUser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');

const router = express.Router();

// ROUTE 1: Get all notes of logged-in user
router.get('/fetchallnotes', fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ ROUTE 2: Add a new note using: POST "/api/notes/addnote"
router.post('/addnote', fetchUser, [
  body('title', 'Title must be at least 3 characters').isLength({ min: 3 }),
  body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create new note
    const note = new Notes({
      title,
      description,
      tag,
      user: req.user.id
    });

    const savedNote = await note.save();
    res.json(savedNote);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//route 3

router.put('/updatenote/:id', fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // Create a newNote object with only provided fields
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // Find the note to be updated and verify ownership
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send("Note Not Found");

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Update the note
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true } // return the updated note
    );

    res.json({ success: true, note });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


//route 4
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
  try {
    // Find the note to delete
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note Not Found");
    }

    // Allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Delete the note
    await Notes.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Note has been deleted", note });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

