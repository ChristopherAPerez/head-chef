import React from "react";

function MealCard( { recipe } ) {

    function handleClick(){
        console.log(recipe.id)
    }

    return (
        <>
            <p onClick={handleClick}>{recipe.recipe_name}</p>
        </>
    )
}

export default MealCard;