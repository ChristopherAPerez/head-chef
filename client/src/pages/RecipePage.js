import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { UserContext } from '../components/App';
// import { useNavigate } from "react-router-dom"

import stir from '../images/Pot RICE.GIF'

function RecipePage( { recipe } ) {

  function handleClick(){
    console.log("Yay")
  }


  return (
    <>
      {/* <>
        <h3>{recipePage.meal}</h3>
        <img src={recipePage.recipe_pic} alt={recipePage.recipe_pic} width="400" height="400" />
        <h1>{recipePage.recipe_name}</h1><br></br>
        <p><b>Description: </b>{recipePage.description}</p>
        <p><b>Calories: </b>{recipePage.description}</p>
        <p><b>Prep-time: </b>{recipePage.description}</p>
        <div><b>steps: </b>{recipePage.steps.map((step, index) => {
          return <ul key={index}>{step}</ul>
        })}</div>
      </> */}
      <button onClick={handleClick}>recipe</button>
    </>
  );
}

export default RecipePage;