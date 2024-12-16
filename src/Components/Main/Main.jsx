import { useState } from "react"
import react from "react"
import Form from "../Form/Form"
import styles from "./Main.module.css"

const Main = () => {
    const [allNotes, setAllNotes] = useState([])

    const addNote = (newNote) => {
        setAllNotes((prevValue) => {
            return [...prevValue, newNote]
        })
    }

    const deleteNote = (id) => {
        setAllNotes((prevValue) => {
            return prevValue.filter((note, index) => {
                return index !== id
            })
        })
    }

    return (
        <>
            <Form onAdd={addNote}/>
            <div className={styles.noteConteiner}>
                {allNotes.map((note, index) => {
                    return (
                        <div key={index} id={index} className={styles.note}>
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>
                            <button onClick={() => deleteNote(index)}>Delete</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Main
