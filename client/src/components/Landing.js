
import React from "react";
import s from "./../styles/Landing.module.css"
import { Link } from "react-router-dom";


export default function LandingPage(){
  return(
    <div className={s.landing}>
    <div className={s.bienvenida}>
      <h1>Bienvenido a <em>FoodApp</em></h1>
      <Link to= "/home">
        <button>Entrar</button>
      </Link>
    </div>
      
    </div>
  )
}