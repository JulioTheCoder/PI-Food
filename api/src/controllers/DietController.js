const axios = require("axios");
const { Diet } = require("./../db");
require('dotenv').config();
const { API_KEY } = process.env;

const loadingDiets = async () =>{
  let dietsDefault = [
    "gluten free",
    "ketogenic",
    "vegetarian",
    "lacto-vegetarian",
    "ovo-vegetarian",
    "vegan",
    "pescetarian",
    "paleo",
    "primal",
    "low fodmap",
    "whole 30"
  ];

  let dietsApi = (await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=45`))
  .data.results.map(d => d.diets);
  dietsApi = dietsApi.flat();
  const diets = [...new Set(dietsDefault.concat(dietsApi))];//Método de métodos, genial para sacar valores de forma única de un array
  

  diets.forEach(d =>{
    Diet.findOrCreate({
      where: {name: d}
    })
  });

  console.log("Dietas cargadas a la DB");

}



const getDietsDB = (req, res, next) =>{
  Diet.findAll()
  .then(d => res.send(d))
  .catch(e => next(e))
}

module.exports={
  loadingDiets,
  getDietsDB
}