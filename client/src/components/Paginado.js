import React from "react";

export default function Paginado ({recipePerPage, allRecipes, paginado}){
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes/recipePerPage); i++) {
    pageNumbers.push(i)
    
  }
  return(
    <div>
      <ul>
        {
          pageNumbers &&
          pageNumbers.map( number =>(
            <li key={number}>
              <a onClick={() => paginado(number)}>{number}</a>
            </li>
          ))
        }
      </ul>
    </div>
  )
}