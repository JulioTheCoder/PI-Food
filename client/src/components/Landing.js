
import React from "react";
import { Link } from "react-router-dom";


export default function LandingPage(){
  return(
    <div className={`landing`}>
      <h1>Bienvenido a FoodApp</h1>
      <Link to= "/home">
        <button>Entrar</button>
      </Link>
    </div>
  )
}