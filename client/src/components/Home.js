import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import Nav from "./Nav";
import s from "./../styles/Home.module.css"

export default function Home(){

  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const allDiets = useSelector((state) => state.diets);
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

  function handlerClick(e){
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
      handlerClick(e);
    } else {
      e.preventDefault();
      dispatch(action.orderByName(e.target.value));
      setCurrentPage(1);
      setOrder(`Ordenado ${e.target.value}`);
    }
    
  }

  
  function handlerOderByHealthScoer(e){
    if (e.target.value === "default") {
      handlerClick(e);
    } else {
      e.preventDefault();
      dispatch(action.orderByHealthScore(e.target.value));
      setCurrentPage(1);
      setOrder(`Ordenado ${e.target.value}`);
    }
    
  }

  

  return (
    <div>
      

      {/* <div>
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
      </div> */}
      <Nav
      paginado={paginado}
        handlerClick={handlerClick}
        handlerOderByTitle={handlerOderByTitle}
        handlerOderByHealthScoer={handlerOderByHealthScoer}
        handlerFilterByDiet={handlerFilterByDiet}
        handlerFilterApi_Created={handlerFilterApi_Created}
      />

      <Link to={"/recipe"}><button>Create</button></Link>
      
      <button onClick={e => handlerClick(e)}>Refresh</button>
      
      <Paginado 
        recipePerPage={recipesPerPage}
        allRecipes={allRecipes.length}
        paginado={paginado}
       />
      <div className={s.cards}>
        {
          allRecipes && currentRecipe.map(r => {
            return(<Card key={r.id} id={r.id} title={r.title} img={r.img} diets={r.diets} healthScore={r.healthScore} />)
            })
        }
      </div>
    </div>
  )

}
