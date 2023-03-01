import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from '../components/App';

function OnReload( { test } ) {

  return (
    <>
    <h3>{test.meal}</h3>
    <img src={test.recipe_pic} alt={test.recipe_pic} width="400" height="400"/>
    <h1>{test.recipe_name}</h1><br></br>
    <p><b>Description: </b>{test.description}</p>
    <p><b>Calories: </b>{test.description}</p>
    <p><b>Prep-time: </b>{test.description}</p>
    <div><b>steps: </b>{test.steps.map((step, index) => {
        return <ul key={index}>{step}</ul>
    })}</div>
    </>
  );
}

export default OnReload;