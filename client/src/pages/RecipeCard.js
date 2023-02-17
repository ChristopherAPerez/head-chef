import React from "react";


function RecipeList({ recipe } ) {

    function handleClick() {
        console.log(recipe)
    }

    return (
        <>
            <img src={recipe.recipe_pic} alt={recipe.recipe_pic}/>
            <p onClick={handleClick}>{recipe.recipe_name}</p>
        </>
    )
}

export default RecipeList;