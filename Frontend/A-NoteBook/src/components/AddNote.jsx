import React, { useState, useContext } from "react";
import NoteContext from '../context/NoteContext';

function AddNote() {
  const { addNote } = useContext(NoteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    // Optionally reset the form
    setNote({ title: "", description: "", tag: "" });
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-4">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-bold">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={handleChange}
            minLength={3}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-bold">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={note.description}
            onChange={handleChange}
            minLength={5}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label fw-bold">Tag (optional)</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={handleChange}
            placeholder="Enter tag (e.g. work, personal)"
          />
        </div>

        <button
          disabled={note.title.length < 3 || note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;

