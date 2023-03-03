import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getDiets, postRecipe } from "../actions";
import SelectOptions from "./SelectOptions";

import s from "./../styles/RecipeCreate.module.css";

export function RecipeCreate(){

  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);

  
  const [input, setInput] = useState({
    title: "",
    summary: "",
    healthScore: "",
    img: "",
    steps: [],
    diets: [], 
  });

  const [errors, setErrors] = useState({img:""})
  const [numStep, setNumStep] = useState(0);
  const [descriptionStep, setDescriptionStep] = useState("");
  const [edithStepContent, setEdithStepContent] = useState("")

  useEffect(() =>{
    dispatch(getDiets());
  }, [dispatch]);

  //Controladores del formulario-----------------------------------------------------

  function controllerFormTitle(e){
     if(e.target.value.length < 10){
      return "Solo se admite un min. de 6 caracteres"
    } 
    if (e.target.value.length > 120) {
      return "Solo se permite un max. de 120 caracteres";
    }
    if(!/^[A-Z \( \) \- _ÁÉÍÓÚÑ]*$/i.test(e.target.value)){
      return "Solo se admiten letras, uso de tilde y caracteres como: \" (, ), -, _ \" "
    }
    return "";
  }

  function controllerFormSummary(e){
    if (e.target.value.length > 1000) {
      return "Solo se permite un max. de 1000 caracteres";
    }
    if(!/^[A-Z 0-9 \( \) \- \. \? ' ¿ ! _ÁÉÍÓÚÑ]*$/i.test(e.target.value)){
      return "Solo se admiten letras, uso de tilde y caracteres como: \" (, ), -, _ \" "
    }
    return "";
  }

  function controllerFormImg(e){
    if(!/^(http|https):\/\/+[A-Z 0-9 \/ \( \) \. \- = : _]*.(jpg|jpeg|png)$/i.test(e.target.value)){
      return "La url del recurso debe empezar por (http:// o https://) y terminar en (.jpg/.jpeg, o png)"
    }
    return "";
  }

//-------------------------------------------------------------------------------------

  function handlerChange(e){
    if (e.target.name=="healthScore") {
      setErrors({
        ...errors,
        [e.target.name] :""
      })
      
        setInput({
      ...input,
      [e.target.name] : e.target.value
      })
      if (e.target.value > 100 || e.target.value < 0) {
        setErrors({
          ...errors,
          [e.target.name] :"Solo se acepta valores en el rango de (0 - 100)"
        })
      }
    }

    if (e.target.name=="title") {
      setErrors({
        ...errors,
        [e.target.name] :""
      })
      
        setInput({
      ...input,
      [e.target.name] : e.target.value
      })
      if((controllerFormTitle(e)).length > 0){
        setErrors({
          ...errors,
          [e.target.name] :controllerFormTitle(e)
        })
      }
    }

    if (e.target.name=="summary") {
      setErrors({
        ...errors,
        [e.target.name] :""
      })
      
        setInput({
      ...input,
      [e.target.name] : e.target.value
      })
      if ((controllerFormSummary(e)).length > 0) {
        setErrors({
          ...errors,
          [e.target.name] :controllerFormSummary(e)
        })
      }
    }


    if (e.target.name=="img") {
      setErrors({
        ...errors,
        [e.target.name] :""
      })
      
        setInput({
      ...input,
      [e.target.name] : e.target.value
      })
      if ((controllerFormImg(e)).length>0) {
        setErrors({
          ...errors,
          [e.target.name]:controllerFormImg(e)
        })
      }
    }

    if (e.target.name=="edith") {
      setEdithStepContent(
        e.target.value
      )
    }
    
  }

  function handlerChangeStep(e){
    setDescriptionStep(
      e.target.value
    )

  }

  function handlerSelectDiet(e){

    setErrors({
      ...errors,
      [e.target.name]:""
    })

    if(!(input.diets.includes(e.target.value))){
    setInput({
      ...input,
      diets: [...new Set([...input.diets,e.target.value])]
    })
}else{
  setInput(
    {
      ...input
    }
  )
}
    if(input.diets.length == 0){
      setErrors({
        ...errors,
        [e.target.name]:"Debes seleccionar una dieta"
      })
    }
  }



  function handlerSubmit(e){
    e.preventDefault();

    let checkErrors =[];

    for (const key in errors) {
      if(errors[key].length == 0){
        checkErrors.push(key)
      }
    }
    console.log(checkErrors.length);
    console.log(errors.length);

    let check= true;

    if(checkErrors.length==5 && (Object.keys(errors)).length>0){
      if (input.steps.length == 0) {
         check = window.confirm("Seguro que no quieres agregar steps?"); 
      }
      if(check){
        dispatch(postRecipe(input))
        alert("Created Recipe!")
        setInput({
          title: "",
          summary: "",
          healthScore: "",
          img: "",
          steps: [],
          diets: [],
        })
        history.push("/home");
      }
    }
    else{
      if ((Object.keys(errors)).length == 1) {
       alert("Completa el formulario") 
      }else{
        alert("Falta algo en el formulario")
        console.log(errors);
      }
      
    }
  }


//----------------------------------------Métodos CRUD----------------------------------------------------------------------
function handleAddStep(e) {
  e.preventDefault();
  setInput({
    ...input,
    steps: [...input.steps, {stepNumber:(numStep+1), step:descriptionStep, edith:false}]
  });
  setDescriptionStep("")
  setNumStep(numStep+1);
}

  function deleteDiet(e){
    e.preventDefault();
    const newsDiets = input.diets.filter(d=> e.target.value !== d)
    setInput({
      ...input,
      diets:newsDiets
    })
  }

  function deleteStep(e){
    e.preventDefault();
    let newsSteps = input.steps.filter(d=> e.target.value != d.stepNumber)
    
    
    for (let i = 0; i < newsSteps.length; i++) {
      newsSteps[i].stepNumber=i+1;
      
    }

    setNumStep(newsSteps.length)
    setInput({
      ...input,
      steps:newsSteps
    })
  }

  function edithStep(e){
    e.preventDefault();
    let value = e.target.value.split(",")
    console.log([value]);
    let stepsList = input.steps;
    console.log(`stepsList es: ${stepsList}`);
    if (input.steps[(value[0])-1].edith) {
      stepsList[(value[0])-1].edith=false;
      stepsList[(value[0])-1].step=edithStepContent;
      setInput({
        ...input,
        steps:stepsList
      })
    }else{
      stepsList[(value[0])-1].edith=true
      setEdithStepContent((value[1]))
      setInput({
        ...input,
        steps:stepsList
      })
    }

  }


//---------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------Render---------------------------------------------------------
  return(
    <div className={s.create}>
      <Link to={"/home"}><button className={s.btn}>{`< Volver`}</button></Link>
      
      <div className={s.form}>
        <h1>Crea tu receta</h1>
        <form onSubmit={(e) => handlerSubmit(e)}>

          <div className={s.title}>
            <label>
              <textarea className={s.text} placeholder={"Title of your recipe"} value={input.title} name="title" onChange={(e) => handlerChange(e)} /> {/*data-css={Boolean(input.title.length>6)}*/}
              {errors.title && (
                <p className="error">{errors.title}</p>
              )}
            </label>
          </div>
          <div className={s.summary}>
            <label>
            <textarea className={s.textSummary} placeholder="Summary" value={input.summary} name="summary"  maxLength={1000} onChange={(e) => handlerChange(e)}/>
            {errors.summary && (
                <p className="error">{errors.summary}</p>
              )}
            </label>
          </div>
          <div className={s.healtScore}>
            <label>
            <input className={s.text} type={"number"} value={input.healthScore} name="healthScore" placeholder="Healt Score (0 - 100)" onChange={(e) => handlerChange(e)}/>
            {errors.healthScore && (
                <p className="error">{errors.healthScore}</p>
              )}
            </label>
          </div>
          <div className={s.image}>
            <label>
              <textarea className={s.text} placeholder={"Image url (optional)"} value={input.img} name="img" onChange={(e) => handlerChange(e)}/>
              {errors.img && (
                  <p className="error">{errors.img}</p>
                )}
            </label>
            
          </div>
          <div className={s.diets}>
            <label>
            <select onChange={(e) => handlerSelectDiet(e)} value={"--Select diet--"} className={s.selectDiets} name={"diets"}>
                <option  hidden disabled >--Select diet--</option>
              <SelectOptions nameOptions={diets}/>
            </select>
            {
              input.diets.length === 0 && errors.diets? <p>Debes seleccionar al menos una dieta</p>: input.diets.length === 0?<p>selecciona una dieta</p>:
              <ul>{input.diets.map(p=>(<li key={p} className={s.liDiet}>{`${p}`}<button value={p} onClick={(e)=>deleteDiet(e)}>x</button></li>))}</ul>
            }
          </label>
            

          </div>
          <div className={s.steps}>
            <label> <textarea className={s.text} placeholder={"Stpes (optional)"} onChange={(e) => handlerChangeStep(e)} value={descriptionStep}/>
            <button onClick={(e) => handleAddStep(e) }>add step</button></label>
            
            <div>
              <ul>{input.steps.map(step=> (
                <li key={step.stepNumber}>
                  <h1>{`Step ${step.stepNumber}:`}</h1>
                {
                  step.edith?<><textarea value={edithStepContent} onChange={(e)=>handlerChange(e)} name={"edith"}/> <button value={[step.stepNumber, step.step]} onClick={(e)=>edithStep(e)}>Listo</button></>:<><p>{step.step}</p><button value={[step.stepNumber, step.step]} onClick={(e)=> edithStep(e)}>editar</button></>
                }
                  
                  <button value={step.stepNumber} onClick={(e)=>deleteStep(e)}>x</button>
                </li>))}</ul>
            </div>
          </div>
          <button type="submit">Create recipe</button>
        </form>
      </div>
    </div>
  )
}