const axios = require("axios");
const {Diet, Recipe} = require("./../db");
/* require('dotenv').config();
const {API_KEY} = require("./../db") */
const CLAVE = "b47ac610270549a8828564583724296f";
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

const getRecipeById = 0;

//----------Funciones auxiliares----------------
async function AllData(){
  const api = await getDataApi();
  const db = await getDataDBFix();

  const data = api.concat(db);
  return data;
};

async function getDataApi(){
  let data = (await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${CLAVE}&addRecipeInformation=true`)).data.results.map(recipe =>({
   
    name: recipe.title,
    img: recipe.image,
    diets: recipe.diets,
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
  let fix = list.map(el =>({
    id:el.id,
    name:el.name,
    summary:el.summary,
    score: el.score,
    steps: el.steps,
    created: el.createInDB,
    diets: el.diets.map(d=>d.name)
  }))
  return fix;
}

async function getDataApiById(id){
  try{
    let data = (await axios(`https://api.spoonacular.com/recipes/${id}/information?key=${CLAVE}`)).data;
  data=[data];
  data=data.map(d =>({
    id: d.id,
    name: d.title,
    img: d.image,
    diets: d.diets || ["Sin definir..."],
    healtScore:d.healtScore,
    rating:d.rating,
    plataforms:d.parent_platforms.map(p => p.platform.name),
    description:d.description,
    created: false
  })); 
  return data;
  } catch (error){return [];}
  
}
//716426


getDataApi();