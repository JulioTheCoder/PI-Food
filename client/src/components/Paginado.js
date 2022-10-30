import React from "react";
import s from "./../styles/Paginado.module.css"

export default function Paginado ({recipePerPage, allRecipes, paginado}){
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes/recipePerPage); i++) {
    pageNumbers.push(i)
    
  }
  return(
    <div className={s.paginado}>
      <ul className={s.list}>
        {
          pageNumbers &&
          pageNumbers.map( number =>(
            <li key={number} onClick={() => paginado(number)}>
              <a onClick={() => paginado(number)}>{number}</a>
            </li>
          ))
        }
      </ul>
    </div>
  )
}