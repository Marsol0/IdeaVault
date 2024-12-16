import { useState, useEffect } from "react";
import react from "react";
import axios from "axios";
import Form from "../Form/Form";
import styles from "./Main.module.css";

const Main = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3002/api/notes")
      .then((response) => setAllNotes(response.data))
      .catch((err) => setError("Failed to load notes."));
  }, []);

  const addNote = (newNote) => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      setError("Please fill in both the title and content fields.");
      return;
    }

    axios
      .post("http://localhost:3002/api/notes", newNote)
      .then((response) => {
        setAllNotes((prev) => [...prev, response.data]);
        setError(null);
        console.log(allNotes)
      })
      .catch(() => setError("Failed to add note."));
  };

  const deleteNote = (id) => {
    axios
      .delete(`http://localhost:3002/api/notes/${id}`)
      .then(() => setAllNotes((prev) => prev.filter((note) => note.id !== id)))
      .catch(() => setError("Failed to delete note."));
  };

  return (
    <>
    <Form onAdd={addNote} />
    {error && <h3 className={styles.error}>{error}</h3>}
    <div className={styles.noteConteiner}>
      {allNotes.map((note) => (
        <div key={note.id} className={styles.note}>
          <h3>{note.note_data.title}</h3> 
          <p>{note.note_data.content}</p> 
          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  </>
  );
};

export default Main;
