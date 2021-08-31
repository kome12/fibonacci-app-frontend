import { Container } from "@material-ui/core";
import { motion } from "framer-motion";
import React from "react";
import "./NewGarden.css";

interface NewGardenProps {
  nameChangeHandler: React.ChangeEventHandler<HTMLInputElement>,
  name: string,
  descChangeHandler: React.ChangeEventHandler<HTMLInputElement>,
  desc: string
}

export const NewGarden = ({nameChangeHandler, name, descChangeHandler, desc}:NewGardenProps) => {
  
  return (
    <Container className="new-garden-container" 
               component={motion.div}
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0}}
               transition={{ duration: 0.6 }}
               exit={{ opacity: 0, x: -50 }}>
      <h2>Create Garden</h2>
        <label htmlFor="desc"><p>Name:</p></label>
        <p>Give your Garden a name! *required</p>
        <input className="garden-name" 
               type="text" 
               name="name" 
               onChange={nameChangeHandler} 
               value={name}
               autoComplete="off"/>

        <label htmlFor="desc"><p>Description:</p></label>
        <p>Add a description! (optional)</p>
        <input className="garden-desc" 
               type="text" 
               name="desc" 
               onChange={descChangeHandler} 
               value={desc}
               autoComplete="off" />
    </Container>
  )
}