import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../actions";
import { Link } from "react-router-dom";
import SelectOptions from "./SelectOptions";
import Card from "./Card";
import Paginado from "./Paginado";


export default function Home(){

  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const allDiets = useSelector((state) => state.diets)
  const [currentPage, setCurrentPage] = useState(1);
  const [ recipesPerPage, setReciPeperPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipe = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);


  const paginado = (pageNumber) =>{
    setCurrentPage(pageNumber)
  }

  useEffect(() =>{
    dispatch(action.getRecipes());
    dispatch(action.getDiets());
  },[dispatch]);

  function handleClick(e){
    e.preventDefault();
    dispatch(action.getRecipes());
  }

  function handlerFilterByDiet(e){
    e.preventDefault();
    dispatch(action.filterRecipeByDiet(e.target.value))
  }

  return (
    <div>
      <Link to={"/recipe"}></Link>
      <h1>Home</h1>
      <button onClick={e => handleClick(e)}>Refresh</button>

      <div>
        <select>
          <option value={"default"}>Nombre</option>
          <option value={"asc"}>Ascendente</option>
          <option value={"desc"}>Descendente</option>
        </select>

        <select>
          <option value={"default"}>Punto de salud</option>
          <option value={"asc"}>Ascendente</option>
          <option value={"desc"}>Descendente</option>
        </select>

        <select onChange={(e) => handlerFilterByDiet(e)}>
          <option value={"default"}>Dieta</option>
          <SelectOptions nameOptions={allDiets} />
        </select>

        <select>
          <option value={"all"}>Api/Ceated</option>
          <option value={"api"}>Api</option>
          <option value={"created"}>Created</option>
        </select>
      </div>
      <Paginado 
        recipePerPage={recipesPerPage}
        allRecipes={allRecipes.length}
        paginado={paginado}
       />
      <div>
        {
          allRecipes && currentRecipe.map(r => {
            return(<Card key={r.id} id={r.id} name={r.name} img={r.img} diets={r.diets} healthScore={r.healthScore} />)
            })
        }
      </div>
    </div>
  )

}
