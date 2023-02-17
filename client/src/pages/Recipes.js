import React, { useContext, useState, useEffect, createContext } from "react";
import { UserContext } from '../components/App';

import RecipeList from './RecipeList'
import MyRecipeList from './MyRecipeList'
import NewRecipeForm from './NewRecipeForm'

export const RecipeContext = createContext();

function Recipes() {

    const { user } = useContext(UserContext)
    const [recipes, setRecipes] = useState(user.recipes)
    const [allRecipes, setAllRecipes] = useState([])
    const [page, setPage] = useState("Recipes")

    useEffect(() => {

        fetch("/recipes").then((r) => {
            if (r.ok) {
                r.json().then((recipes) => {
                    setAllRecipes(recipes)
                })
            }
        });
    }, []);

    function handleClick() {
        console.log(recipes)
    }

    function handleNewRecipeClick() {
        setPage("New Recipes")
    }

    function handleMyRecipesClick() {
        setPage("My Recipes")
    }

    function handleRecipeClick() {
        setPage("Recipes")
    }

    return (
        <>
            <button onClick={handleClick}>Recipes</button>
            <br></br>
            <button onClick={handleMyRecipesClick}>My Recipes</button>
            <button onClick={handleRecipeClick}>Recipes</button>
            <button onClick={handleNewRecipeClick}>New Recipe</button>
            <br></br>

            {
                page === "Recipes" ?
                    <RecipeContext.Provider value={{ allRecipes, setAllRecipes }}>
                        <RecipeList />
                    </RecipeContext.Provider>

                    :
                    page === "My Recipes" ?
                        <RecipeContext.Provider value={{ recipes, setRecipes }}>
                            <MyRecipeList />
                        </RecipeContext.Provider>
                        :
                        <RecipeContext.Provider value={{ allRecipes, setAllRecipes, recipes, setRecipes }}>
                            <NewRecipeForm />
                        </RecipeContext.Provider>
            }

            <br></br>
        </>
    )
}

export default Recipes;