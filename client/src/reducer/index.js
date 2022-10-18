let initialState ={
  recipes: [],
  allRecipes: [],
  diets: []

}

function rootReducer(state = initialState, action){

  switch (action.type) {
    case "GET_RECIPES":
      return{
        ...state,
        recipes: action.payload,
        allRecipes: action.payload
      }

    case "GET_DIETS":
      return{
        ...state,
        diets: action.payload
      }
    case "FILTER_BY_DIET": 
      const allRecipesFBD = state.recipes;
      //console.log("Paiload: ",action.payload)
      const statusFiltered = action.payload === "Todo"? allRecipesFBD: allRecipesFBD.filter(el => el.diets.includes(action.payload));
      
        return{
          ...state,
          recipes:statusFiltered
        }

    case "FILTER_BY_API_CREADO":
      const allVideogamesFBAC = state.allVideogames;
      const apiOCreado = action.payload === "Api"? allVideogamesFBAC.filter(el => !(el.created)) : allVideogamesFBAC.filter(el => el.created);
      return{
        ...state,
        videogames:action.payload === "Todo"?allVideogamesFBAC:apiOCreado
      }

    default:
      return state;
  }
}

export default rootReducer;