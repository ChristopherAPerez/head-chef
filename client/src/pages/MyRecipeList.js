import React, { useContext } from "react";
import MyRecipeCard from './MyRecipeCard'

import { RecipeContext } from './Recipes';

function MyRecipeList() {
    const { recipes, setRecipes } = useContext(RecipeContext)

    function updatedRecipes(update) {
        const updatedRecipes = recipes.map((recipe) => {
            if (recipe.id === update.id) {
                return update;
            } else {
                return recipe;
            }
        });
        setRecipes(updatedRecipes);
    }

    return (
        <>
        {recipes.map((recipe) => {
            return <MyRecipeCard key={recipe.id} recipe={recipe} updatedRecipes={updatedRecipes}/>
        })}
        </>
    )
}

export default MyRecipeList;