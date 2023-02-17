import React from "react";

function RecipeList( { recipe, index } ) {

    return (
        <>
        <p>{index}</p>
        <h1>{recipe.recipe_name}</h1>
        <h1>{recipe.meal}</h1>
        </>
    )
}

export default RecipeList;