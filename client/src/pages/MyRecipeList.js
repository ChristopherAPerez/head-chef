import React, { useContext } from "react";
import MyRecipeCard from './MyRecipeCard'

import { RecipeContext } from './Recipes';

function MyRecipeList() {
    const { recipes, setRecipes } = useContext(RecipeContext)

    function handleClick() {
        console.log(recipes)
        console.log(setRecipes)
    }

    return (
        <>
        {recipes.map((recipe) => {
            return <MyRecipeCard key={recipe.id} recipe={recipe} />
        })}
        <button onClick={handleClick}>MyRecipeList</button>
        </>
    )
}

export default MyRecipeList;