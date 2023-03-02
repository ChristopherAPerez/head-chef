import React, { useContext } from "react";
import RecipeCard from './RecipeCard';

import { RecipeContext } from './Recipes';

function RecipeList() {

    const { allRecipes, setAllRecipes } = useContext(RecipeContext)

    function updatedRecipes(update) {
        const updatedRecipes = allRecipes.map((recipe) => {
            if (recipe.id === update.id) {
                return update;
            } else {
                return recipe;
            }
        });
        setAllRecipes(updatedRecipes);
    }

    return (
        <>
            {allRecipes.map((recipe) => {
                return <RecipeCard key={recipe.id} recipe={recipe} updatedRecipes={updatedRecipes} />
            })}
        </>

    )
}

export default RecipeList;