import React from "react";

function MealCard({ recipe, index }) {

    function handleClick() {
        console.log(recipe.description.length)
    }

    return (
        <>
            <tr>
                <td className="menuHistorySlot">
                    {index === 0 ? <p><b>Breakfast</b></p> : index === 1 ? <p><b>Lunch</b></p> : <p><b>Dinner</b></p>}
                    <img src={recipe.recipe_pic} alt={recipe.recipe_pic} width="50px" height="50px" />
                </td>
                <td className="menuHistorySlot">
                    <p>{recipe.recipe_name}</p>
                    <p onClick={handleClick}>{recipe.description.length > 70 ? <span>{recipe.description}...</span> : <span>{recipe.description}</span>}</p>
                </td>
            </tr>
        </>
    )
}

export default MealCard;