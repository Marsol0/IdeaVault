import React, { useState } from "react";

import styles from "./Form.module.css";

const Form = (props) => {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [shrinkRows, setShtinkRows] = useState(false);

  const onChangeFn = (e) => {
    const { name, value } = e.target;

    setNote((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const handleClick = (e) => {
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    e.preventDefault();
  };

  const handleExpand = () => {
    setShtinkRows(true);
    console.log(shrinkRows);
  };
  return (
    <form>
        {shrinkRows && (
            <input
            type="text"
            placeholder="Title"
            name="title"
            value={note.title}
            onChange={onChangeFn}
          />
        )}
      
      <textarea
        onClick={handleExpand}
        rows={shrinkRows ? 1 : 1}
        placeholder="What's on your mind?"
        name="content"
        value={note.content}
        onChange={onChangeFn}
      ></textarea>
      {shrinkRows && <button className={styles.submitNote}onClick={handleClick}>+</button>}
    </form>
  );
};

export default Form;
