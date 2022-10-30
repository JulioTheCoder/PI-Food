import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions";
import { useEffect } from "react";
import { clearDetails } from "../actions";
import s from "./../styles/Details.module.css";

export default function Detail(props){
  
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getDetails(props.match.params.id));
  },[dispatch]);

  function clearDet() {
      dispatch(clearDetails()) ;
  }

  const myRecipe = useSelector((state)=> state.details);
  
  return(
    <div>
    <Link to={"/home"} onClick={e => clearDet()}>
        <button>Volver</button>
      </Link>
      <div className={s.info}>
        {
        myRecipe.length>0 ?

        <div>
          <h1>{myRecipe[0].name}</h1>
          <img src={myRecipe[0].img} alt="Not Found Image" width={"300px"} height={"375px"}/>
          <h2>Diets: {myRecipe[0].diets.join(", ")}</h2>
          <h3>HealthScore: {myRecipe[0].healthScore}</h3>
          <h3>Summary: {myRecipe[0].summary}</h3>
          <h2>Steps</h2>
          <div>
            <ul> {
              myRecipe[0].steps.map(s =>(
                
                <li key={s.stepNumber}>
                  <h3>{s.stepNumber}</h3>
                  <p>{s.step}</p>
                </li>
                
              ))
            }
            </ul>
          </div>
          
        </div>:
        <p>Loading...</p>
      }
      </div>
      

      
    </div>
  )
}