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
  const [ order, setOrder ] = useState("")
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

  function handlerFilterApi_Created(e){
    e.preventDefault();
    dispatch(action.filterRecipeApiOCreado(e.target.value));
  }

  function handlerOderByTitle(e) {
    if (e.target.value === "default") {
      handleClick(e);
    } else {
      e.preventDefault();
      dispatch(action.orderByName(e.target.value));
      setCurrentPage(1);
      setOrder(`Ordenado ${e.target.value}`);
    }
    
  }

  function handlerOderByHealthScoer(e) {
    if (e.target.value === "default") {
      handleClick(e);
    } else {
      e.preventDefault();
      dispatch(action.orderByHealthScore(e.target.value));
      setCurrentPage(1);
      setOrder(`Ordenado ${e.target.value}`);
    }
    
  }

  return (
    <div>
      <Link to={"/recipe"}></Link>
      <h1>Home</h1>
      <button onClick={e => handleClick(e)}>Refresh</button>

      <div>
        <select onChange={(e) => handlerOderByTitle(e)}>
          <option value={"default"}>Title</option>
          <option value={"asc"}>Ascendente</option>
          <option value={"des"}>Descendente</option>
        </select>

        <select onChange={(e) => handlerOderByHealthScoer(e)}>
          <option value={"default"}>Health Score</option>
          <option value={"asc"}>Ascendente</option>
          <option value={"des"}>Descendente</option>
        </select>

        <select onChange={(e) => handlerFilterByDiet(e)}>
          <option value={"all"}>Diet</option>
          <SelectOptions nameOptions={allDiets} />
        </select>

        <select onChange={(e) => handlerFilterApi_Created(e)}>
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
