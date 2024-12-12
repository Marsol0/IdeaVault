import { useState } from "react"
import react from "react"
import Form from "../Form/Form"
import styles from "./Main.module.css"
const Main = () => {
    const [allNotes, setAllNotes] = useState([])
    return (
        <>
        <Form />
        <div className={styles.noteConteiner}>
            <div className={styles.noteList}>
                <h3>asd</h3>
                <p>asdasdasdasdad</p>
            </div>
           
        </div>
        </>
    )
}

export default Main