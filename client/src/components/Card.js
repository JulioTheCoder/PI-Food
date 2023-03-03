import React from "react";
import { Link } from "react-router-dom";
import s from "./../styles/Card.module.css"

export default function Card({img, title, diets, healthScore, id,}) {
  return(
    <Link to={`/home/${id}`} className={s.link}>
      <div className={s.card}>
        <img src={img} alt={"image not found"}  width={"200px"} height={"250px"} />
        <div>
          <h2>{title}</h2>
        </div>
        <div>
          <h2>Health score:</h2>
        <h3>{healthScore}</h3>
        </div>
        <div>
          <h2>Diet:</h2>
        <h3>{diets.join(", ")}</h3>
        </div>
        
      </div>
    </Link>
    
  )
}