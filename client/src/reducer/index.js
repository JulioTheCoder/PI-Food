let initialState ={
  recipes: [],
  allRecipes: [],
  diets: [],
  details:[]

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
      const allRecipesFBD = state.allRecipes;
      //console.log("Paiload: ",action.payload)
      const statusFiltered = action.payload === "all"? allRecipesFBD: allRecipesFBD.filter(el => el.diets.includes(action.payload));
      statusFiltered.length === 0 && alert(`No hay resultados para: ${action.payload}`);

        return{
          ...state,
          recipes:statusFiltered.length?statusFiltered:allRecipesFBD
        }

    case "FILTER_BY_API_CREADO":
      const allRecipesFBAC = state.allRecipes;
      const apiOCreado = action.payload === "api"? allRecipesFBAC.filter(el => !(el.created)) : allRecipesFBAC.filter(el => (el.created));
      apiOCreado.length === 0 && action.payload !== "all" && alert(`No hay filtro por: ${action.payload}`) 
      return{
        ...state,
        recipes:action.payload === "all"?allRecipesFBAC:apiOCreado.length === 0?allRecipesFBAC:apiOCreado
      }

    case "ORDER_BY_NAME":
      let ordenNameArr = action.payload === "asc"?
      state.recipes.sort(function(a, b){
        if (a.name > b.name) {
          return 1
        }
        if(a.name < b.name){
          return -1;
        }
        return 0;
      }):action.payload === "des"?
      
      state.recipes.sort(function(a, b){
        if (a.name > b.name) {
          return -1;
        }
        if(a.name < b.name){
          return 1;
        }
        return 0
      }):state.allRecipes
      
      return{
        ...state,
        recipes:ordenNameArr
      }
  
    case "ORDER_BY_HEALTHSCORE":
      let ordenRatingArr = action.payload === "asc"?
      state.recipes.sort(function(a, b){
        if (a.healthScore > b.healthScore) {
          return 1
        }
        if(a.healthScore < b.healthScore){
          return -1;
        }
        return 0;
      }):action.payload === "des"?
      
      state.recipes.sort(function(a, b){
        if (a.healthScore > b.healthScore) {
          return -1;
        }
        if(a.healthScore < b.healthScore){
          return 1;
        }
        return 0
      }):state.allRecipes
      
      return{
        ...state,
        recipes:ordenRatingArr
      }

    case "GET_BY_NAME":
      return{
        ...state,
        recipes:action.payload
      }
      
    case "POST_RECIPE":
      return{
        ...state
      }
    case "GET_DETAILS":
      return{
        ...state,
        details:action.payload
      }
    case "CLEAR_DETAILS":
      return{
        ...state,
        details:[]
      }
    default:
      return state;
  }
}

export default rootReducer;