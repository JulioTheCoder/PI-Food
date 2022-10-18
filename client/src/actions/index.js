import axios from "axios";

export function getRecipes() {
  return async function(dispatch){
    const data = (await axios("http://localhost:3001/recipes")).data;

    return dispatch({
      type: "GET_RECIPES",
      payload: data
    })
  }
}

export function getDiets() {
  return async function(dispatch){
    const data = (await axios("http://localhost:3001/diet")).data;

    return dispatch({
      type: "GET_DIETS",
      payload: data
    })
  }
}

export function filterRecipeByDiet(payload){
  //console.log(payload)
  return {
    type:"FILTER_BY_DIET",
    payload

  }  
}

export function filterRecipeApiOCreado(payload){
  return{
    type: "FILTER_BY_API_CREADO",
    payload
  }
}

export function orderByName(payload){
  return{
    type: "ORDER_BY_NAME",
    payload
  }
}

export function orderByHealthScore(payload){
  return{
    type: "ORDER_BY_HEALTHSCORE",
    payload
  }
}