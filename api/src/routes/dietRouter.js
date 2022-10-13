const { Router } = require("express");
//Importamos los controladores
const dietController = require("./../Controllers/DietController");

const router = Router();

//Configuramos la ruta de los géneros
router.get("/", dietController.getDietsDB);

module.exports = router;