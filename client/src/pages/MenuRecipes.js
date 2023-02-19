import React from "react";

function MenuRecipes( { recipe, index } ) {

    function handleClick(){
        
    }

    return (
        <>
        <p>{index}</p>
        <h1>{recipe.recipe_name}</h1>
        <h1>{recipe.meal}</h1>
        <button onClick={handleClick}>Remove</button>
        </>
    )
}

export default MenuRecipes;