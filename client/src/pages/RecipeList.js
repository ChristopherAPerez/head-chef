import React, { useContext } from "react";
import { UserContext } from '../components/App';
import RecipeCard from './RecipeCard';

import { RecipeContext } from './Recipes';

function RecipeList() {

    const { user } = useContext(UserContext)

    const { allRecipes, setAllRecipes } = useContext(RecipeContext)

    function handleClick() {
        console.log(user.recipes)
        console.log(allRecipes)
        console.log(setAllRecipes)
    }

    return (
        <>
        {allRecipes.map((recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe}/>
        })}
        <button onClick={handleClick}>RecipeList</button>
        </>
    )
}

export default RecipeList;