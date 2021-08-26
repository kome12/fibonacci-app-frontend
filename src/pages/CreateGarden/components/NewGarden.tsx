import React, { useState } from "react";
import "./NewGarden.css";

export const NewGarden = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(() => e.target.value);
  }
  const descChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  }
  return (
    <div className="new-garden-container">
      <h2>Create Garden</h2>
        <label htmlFor="desc"><p>Name:</p></label>
        <input className="garden-name" type="text" name="name" onChange={nameChangeHandler} value={name}/>

        <label htmlFor="desc"><p>Description:</p></label>
        <input className="garden-desc" type="text" name="desc" onChange={descChangeHandler} value={desc} />
    </div>
  )
}