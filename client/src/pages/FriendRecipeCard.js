import React from 'react';

function FriendRecipeCard({ recipe }) {

    return (
        <>
            <tr >
                <td>
                    <img className='mealCardImage' src={recipe.recipe_pic} alt={recipe.recipe_pic} width="75" height="75" />
                </td>
                <td>
                    <p style={{ fontSize: "10px" }}><b>Description: </b>{recipe.description.substring(0, 200)}...</p>
                </td>
            </tr>
        </>
    )
}

export default FriendRecipeCard;