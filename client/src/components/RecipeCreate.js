import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getDiets, postRecipe } from "../actions";
import SelectOptions from "./SelectOptions";

export function RecipeCreate(){
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);

  const [input, setInput] = useState({
    name: "",
    summary:"",
    healthScore: 0,
    img: "",
    steps: [],
    diets: [], 
  });

  const [numStep, setNumStep] = useState(0);
  const [descriptionStep, setDescriptionStep] = useState("")

  useEffect(() =>{
    dispatch(getDiets());
  }, [dispatch]);

  function handlerChange(e){
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
  }

  function handlerChangeStep(e){
    setDescriptionStep(
      e.target.value
    )
  }

  function handlerSelectDiet(e){
    setInput({
      ...input,
      diets: [...input.diets,e.target.value]
    })
  }

  function handleAddStep(e) {
    e.preventDefault();
    setInput({
      ...input,
      steps: [...input.steps, {stepNum:(numStep+1), step:descriptionStep}]
    });
    setDescriptionStep("")
    setNumStep(numStep+1);
  }

  function handlerSubmit(e){
    e.preventDefault();
    dispatch(postRecipe(input))
    alert("Created Recipe!")
    setInput({
      name: "",
      summary: "",
      healthScore: 0,
      img: "",
      steps: [],
      diets: [],
    })
    history.push("/home");
  }

  return(
    <div className="ceate">
      <Link to={"/home"}><button>Volver</button></Link>
      <h1>Crea tu receta</h1>

      <form onSubmit={(e) => handlerSubmit(e)}>
        <div>
          <label>Title:
          <input type={"text"} value={input.name} name="name" onChange={(e) => handlerChange(e)}/>
          </label>
        </div>
        <div>
          <label>Summary:
          <input type={"text"} value={input.summary} name="summary" onChange={(e) => handlerChange(e)}/>
          </label>
        </div>
        <div>
          <label>Health Score:
          <input type={"number"} value={input.healthScore} name="healthScore"  onChange={(e) => handlerChange(e)}/>
          </label>
        </div>
        <div>
          <label>Img:</label>
          <input type={"text"} value={input.img} name="img" onChange={(e) => handlerChange(e)}/>
        </div>
        <div>
          <label>Diets:</label>
          <select onChange={(e) => handlerSelectDiet(e)}>
            <SelectOptions nameOptions={diets}/>
          </select>

          <ul><li>{input.diets.map(p=>p + ",")}</li></ul>

        </div>
        <div>
          <label>Steps: <input type={"text"} onChange={(e) => handlerChangeStep(e)} value={descriptionStep}/>
          <button onClick={(e) => handleAddStep(e) }>add step</button></label>
          
          <div>
          <ul>{input.steps.map(step=> (<li><h1>{`Step ${step.stepNum}:`}</h1><p>{step.step}</p></li>))}</ul>
          </div>
        </div>
        <button type="submit">Create recipe</button>
      </form>
    </div>
  )
}