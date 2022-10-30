import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../actions";
import s from "./../styles/SearchBar.module.css";

export default function SearchBar ({paginado}) {
  const dispatch = useDispatch();
  const [name, setName]= useState("");

  function hadleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
   
  }
  function handleSubmit(e){
    e.preventDefault()
    dispatch(getRecipeByName(name))
    setName("")
    paginado(1);
    
  }

  return(
    <div className={s.searchBar}>
      <input
        type={"text"}
        placeholder="Buscar receta..."
        onChange={(e) =>hadleInputChange(e)}
        value={name}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)} >🔍</button>
    </div>
  )
  
}