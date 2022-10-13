const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{
      type: DataTypes.STRING,
      allowNull: false
    },
    healthScore:{
      type:DataTypes.INTEGER,
    },
    steps:{
      type:DataTypes.JSON
    },
    img:{
      type:DataTypes.STRING,
      defaultValue: "https://www.kindpng.com/picc/m/198-1980021_food-vector-food-icon-png-transparent-png.png"
    },
    createInDB:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
		timestamps: false
  });
};
