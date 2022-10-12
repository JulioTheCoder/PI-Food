const axios = require("axios");
const { Diet } = require("./../db");

const loadingDiets = () =>{
  const diets = [
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30"
  ];

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