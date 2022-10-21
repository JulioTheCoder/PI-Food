import React from "react";
import Selectors from "./Selectors";
import SearchBar from "./SearchBar";


export default function Nav({handlerClick, handlerOderByTitle, handlerOderByHealthScoer, handlerFilterByDiet, handlerFilterApi_Created}){
  return(
    <div className="nav">
      <h1>Home</h1>
      <SearchBar/>
      <Selectors 
      handlerClick={handlerClick} 
      handlerOderByTitle={handlerOderByTitle} 
      handlerOderByHealthScoer={handlerOderByHealthScoer} 
      handlerFilterByDiet={handlerFilterByDiet} 
      handlerFilterApi_Created={handlerFilterApi_Created}/>
      
    </div>
  )

  
}