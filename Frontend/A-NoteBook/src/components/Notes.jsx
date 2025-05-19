import AddNote from './Addnote';
import { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/NoteContext';
import NotesItem from './NotesItem';
import { useNavigate } from 'react-router-dom';

function Notes() {
  const { notes, getNotes, editNote } = useContext(NoteContext);
  const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate('/login'); // fixed here
    }
  }, []);

  const ref = useRef(null);       // For opening modal
  const refClose = useRef(null);  // For closing modal

  // Called when Edit icon is clicked
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag
    });
  };

  // Controlled form change
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // Save changes
  const handleClick = () => {
    editNote(note.id, note.title, note.description, note.tag);
    refClose.current.click(); // Close modal after saving
  };

  return (
    <>
      <AddNote />

      {/* Hidden trigger button */}
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch modal
      </button>

      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refClose}></button>
            </div>
            <div className="modal-body">
              <form className="my-3 container">
                <div className="my-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={note.title}
                    onChange={handleChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={note.description}
                    onChange={handleChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    value={note.tag}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-3">
        <h2>Your Notes</h2>
        {notes.length === 0 && <p>No notes to display</p>}
        <div className="row">
          {notes.map((note) => (
            <NotesItem key={note._id} updateNote={updateNote} note={note} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Notes;

 

