import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectOptions from "./SelectOptions";



export default function Selectors({handlerOderByTitle, handlerOderByHealthScoer, handlerFilterByDiet, handlerFilterApi_Created}){
  
  const allDiets = useSelector((state) => state.diets);


  return(
    <div className="selectors">
        <select onChange={(e) => handlerOderByTitle(e)}>
          <option value={"default"}>Title</option>
          <option value={"asc"}>Ascendente</option>
          <option value={"des"}>Descendente</option>
        </select>

        <select onChange={(e) => handlerOderByHealthScoer(e)}>
          <option value={"default"}>Health Score</option>
          <option value={"asc"}>Ascendente</option>
          <option value={"des"}>Descendente</option>
        </select>

        <select onChange={(e) => handlerFilterByDiet(e)}>
          <option value={"all"}>Diet</option>
          <SelectOptions nameOptions={allDiets} />
        </select>

        <select onChange={(e) => handlerFilterApi_Created(e)}>
          <option value={"all"}>Api/Ceated</option>
          <option value={"api"}>Api</option>
          <option value={"created"}>Created</option>
        </select>
      </div>
  )
}