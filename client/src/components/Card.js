import React from "react";
import { Link } from "react-router-dom";

export default function Card({img, name, diets, healthScore, id,}) {
  return(
    <Link to={`/home/${id}`}>
      <div>
        <img src={img} alt={"image not found"}  width={"200px"} height={"250px"} />
        <h2>{name}</h2>
        <h2>Health score.</h2>
        <h3>{healthScore}</h3>
        <h2>Diet</h2>
        <h3>{diets.join(", ")}</h3>
      </div>
    </Link>
    
  )
}