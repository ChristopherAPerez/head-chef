import React from "react";

function MenuRecipes( { recipe, index } ) {

    const name = recipe.recipe_name.substring(0,29)

    return (
        <>
        {index === 0 ? <p><b>Breakfast</b></p> : index === 1 ? <p><b>Lunch</b></p> : <p><b>Dinner</b></p>}
        {name.length > 30 ? <p>{name}...</p> : <p>{name}</p>}
        </>
    )
}

export default MenuRecipes;