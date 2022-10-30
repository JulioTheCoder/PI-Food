import React from "react";
import Selectors from "./Selectors";
import SearchBar from "./SearchBar";
import s from "./../styles/Nav.module.css"

export default function Nav({paginado, handlerClick, handlerOderByTitle, handlerOderByHealthScoer, handlerFilterByDiet, handlerFilterApi_Created}){
  return(
    <div className={s.nav}>
      <h1>Home</h1>
      <SearchBar paginado={paginado}/>
      <Selectors 
      handlerClick={handlerClick} 
      handlerOderByTitle={handlerOderByTitle} 
      handlerOderByHealthScoer={handlerOderByHealthScoer} 
      handlerFilterByDiet={handlerFilterByDiet} 
      handlerFilterApi_Created={handlerFilterApi_Created}/>
      
    </div>
  )

  
}