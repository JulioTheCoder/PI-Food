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
  console.log(myRecipe);
  return(
    <div>
    <Link to={"/home"} onClick={e => clearDet()}>
        <button className={s.btn}>{"< Volver"}</button>
      </Link>
      <div className={s.info}>
        {
        myRecipe.length>0 ?

        <div className={s.detail}>
          <div className={s.info_principal}>
            <img className={s.image} src={myRecipe[0].img} alt="Not Found Image" width={"350px"} height={"375px"}/>
            <div className={s.primario}>
              <h1>{myRecipe[0].title}</h1>
              <h2>{`Diets: ${myRecipe[0].diets.join(", ")}`}</h2>
              <h2>{`HealthScore: ${myRecipe[0].healthScore}`}</h2>
              <div className={s.resumen}>
                <h2>Summary:</h2>
                <p dangerouslySetInnerHTML={{__html: myRecipe[0].summary}}></p>
              </div>
            </div>
          </div>
          
            <div className={s.steps}>
              
              <div className={s.list}><h2>Steps</h2>
                <ul> {
                  myRecipe[0].steps.stepNumber?
                  myRecipe[0].steps.map(s =>(
                    
                    <li key={s.stepNumber}>
                      <h3>{`Step ${s.stepNumber}`}</h3>
                      <p>{s.step}</p>
                    </li>
                    
                  )):
                  <p>No steps</p>
                }
                </ul>
              </div>

            </div>

        </div>:
        <p>Loading...</p>
      }
      </div>
      

      
    </div>
  )
}