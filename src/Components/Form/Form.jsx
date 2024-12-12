import React, { useState } from "react";

import styles from "./Form.module.css"

const Form = () => {
    const [note, setNote] = useState({
        title: "",
        content: ""
    })
    
    const onChangeFn = (e) => { 
        const { name, value } = e.target

       setNote((prevValue) => ({
        ...prevValue,
        [name]: value
       }))
    }
    const handleClick = (e) => {
        e.preventDefault()
        
    }
    return (
        <form>
            <input type="text" placeholder="Title" name="title" value={note.title} onChange={onChangeFn}/>
            <textarea rows={6} placeholder="What's on you're mind?" name="content" value={note.content} onChange={onChangeFn}></textarea>
            <button onClick={handleClick}>add</button>
        </form>
    )
}

export default Form