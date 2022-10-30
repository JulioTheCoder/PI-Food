const axios = require("axios");
const {Diet, Recipe} = require("./../db");
require('dotenv').config();
const { API_KEY } = process.env;
 
//---------controladores-------------- 

const getAllRecipes = async (req, res, next)=>{
  const data = await AllData();
  const {name} = req.query|| "";

  if (name) {
    let result = data.filter(d => d.name.toLowerCase().includes(name.toLowerCase()) );
    if (result.length) {
      res.json(result);
    }else{
      res.status(404).send(`Lo siento, no encontramos la receta: ${name}`);
    }
  }else{
    res.json(data);
  }
}

const getRecipeById = async(req, res, next)=> {
  const {id} = req.params;
  const db = await getDataDBFix();
  const api = await getDataApiById(id);
  const data = api.concat(db)

  if(id){
    const recipeId = data.filter(d => d.id == id)
    console.log(recipeId);
    recipeId.length?
    res.json(recipeId):
    res.status(400).send(`No encontramos conincidencias con el id: ${id}`)
  }
};


const postRecipe = async (req, res, next) =>{
  let {
    name,
    summary,
    allowNull,
    healthScore,
    steps,
    img,
    diets,

  }= req.body;
 
  let dietCreate = await Recipe.create({//Creammos nueva fila al modelo videogames
    name,
    summary,
    allowNull,
    healthScore,
    steps,
    img: img.length > 0?img:"https://www.kindpng.com/picc/m/198-1980021_food-vector-food-icon-png-transparent-png.png"
  });
 
  let dietDB = await Diet.findAll({//Obtenemos los generos de nuestra DB
    where: {name: diets}
  });

  await dietCreate.addDiet(dietDB);//Vinculamos los respectivos generos a la nueva fila
  res.send("Receta creada exitosamente");

}
//----------Funciones auxiliares----------------
async function AllData(){
  const api = await getDataApi();
  const db = await getDataDBFix();

  const data = api.concat(db);
  return data;
};

async function getDataApi(){
  let data = (await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=45`)).data.results.map(recipe =>({
    id: recipe.id,
    name: recipe.title,
    img: recipe.image,
    diets: recipe.diets,
    healthScore: recipe.healthScore,
    created: false

   
  }));
  return data;
}

async function getDataDB() {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    }
  })
  
}

async function getDataDBFix(){
  let list = await getDataDB();
  if (list) {
    let fix = list.map(el =>({
    id:el.id,
    name:el.name,
    summary:el.summary,
    healthScore: el.healthScore,
    steps: el.steps,
    created: el.createInDB,
    diets: el.diets.map(d=>d.name),
    img: el.img
    }))
    return fix
  }
  
  return list;
}

async function getDataApiById(id){
  try{
    let data = (await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=false`)).data;
  data=[data];
  data=data.map(d =>({
    id: d.id,
    name: d.title,
    img: d.image,
    diets: d.diets.length > 0 ?
    d.diets:
    ["Sin definir..."],
    healthScore:d.healthScore,
    steps:d.analyzedInstructions[0]?
    d.analyzedInstructions[0].steps.map(s => (
      {
        stepNumber: s.number,
        step: s.step
      }
    )):
    ["Sin definir..."],
    
    summary:d.summary,
    created: false
  })); 
  console.log(data);
  return data;
  } catch (error){
    return [];}
  
}
//716426


module.exports={
  getAllRecipes,
  getRecipeById,
  postRecipe
}