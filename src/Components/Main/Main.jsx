import { useState, useEffect } from "react";
import react from "react";
import axios from "axios";
import Form from "../Form/Form";
import styles from "./Main.module.css";

const Main = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [error, setError] = useState(null);

  const formatDate = (date) =>
    new Date(date)
      .toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(",", "");

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
    try {
      axios
      .post("http://localhost:3002/api/notes", newNote)
      .then((response) => {
        setAllNotes((prev) => [...prev, response.data]);
        setError(null);
        console.log(allNotes);
      })
      
    } catch {
      setError("Failed to add new note. Please try again")
    }
    
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/notes/${id}`);
      setAllNotes((prev) => prev.filter((note) => note.id !== id));
    } catch {
      setError("Failed to delete note. Please try again.");
    }
  };
  

  return (
    <>
      <Form onAdd={addNote} />

      {error && <h3 className={styles.error}>{error}</h3>}
      <div className={styles.noteConteiner}>
        {allNotes.map((note) => (
          <div key={note.id} className={styles.note}>
            <span>
              {formatDate(note.created_at)}
            </span>
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
