import React from 'react';
import FriendRecipeCard from './FriendRecipeCard';

function MenuCard({ recipes }) {

    return (
        <>
            {recipes.map((recipe) => {
                const id = recipe.id * Math.random()
                return <FriendRecipeCard key={id} recipe={recipe}/>
            })} 
        </>
    )
}

export default MenuCard;