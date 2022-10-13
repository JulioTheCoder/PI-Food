const { Router } = require("express");
const recipeController = require("./../controllers/RecipeController")
//Importamos los controladores


const router = Router();

//Configuramos las rutas de videogames
router.get("/:id", recipeController.getRecipeById);
router.get("/", recipeController.getAllRecipes);
router.post("/", recipeController.postRecipe);

module.exports = router;