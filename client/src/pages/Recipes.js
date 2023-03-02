import React, { useState, useEffect, createContext } from "react";

import CurrentMenu from "../components/CurrentMenu"

import RecipeList from './RecipeList'
import MyRecipeList from './MyRecipeList'
import NewRecipeForm from './NewRecipeForm'
import DiscoverBar from "./DiscoverBar";
import { useNavigate } from "react-router-dom"

export const RecipeContext = createContext();

function Recipes() {

    const navigate = useNavigate()

    const [allRecipes, setAllRecipes] = useState([])
    const [page, setPage] = useState("Recipes")

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        fetch("/recipes").then((r) => {
            if (r.ok) {
                r.json().then((recipes) => {
                    setAllRecipes(recipes)
                })
            }
        });
    }, []);

    function handleNewRecipeClick() {
        setPage("New Recipes")
    }

    function handleMyRecipesClick() {
        navigate("/my_recipes")
    }

    function handleRecipeClick() {
        setPage("Recipes")
    }

    function deleteRecipe(id) {
        const updatedRecipes = allRecipes.filter((recipe) => recipe.id !== id);
        setAllRecipes(updatedRecipes);
    }

    function handleMainMenu() {
        navigate("/")
    }

    return (
        <div className="recipePage">

            <button className="button" onClick={handleMainMenu}>Main Menu</button>
            <br></br>
            <button className="button" onClick={handleMyRecipesClick}>My Recipes</button>
            <button className="button" onClick={handleRecipeClick}>Recipes</button>
            <button className="button" onClick={handleNewRecipeClick}>New Recipe</button>
            <br></br>
            <br></br>

            <CurrentMenu />

            <br></br>

            <RecipeContext.Provider value={{ setAllRecipes }}>
                <DiscoverBar />
            </RecipeContext.Provider>

            {
                page === "Recipes" ?
                    <RecipeContext.Provider value={{ allRecipes, setAllRecipes, deleteRecipe }}>
                        <RecipeList />
                    </RecipeContext.Provider>
                    :
                    page === "My Recipes" ?
                        <RecipeContext.Provider value={{ deleteRecipe }}>
                            <MyRecipeList />
                        </RecipeContext.Provider>
                        :
                        <RecipeContext.Provider value={{ setPage, allRecipes, setAllRecipes }}>
                            <NewRecipeForm />
                        </RecipeContext.Provider>
            }

            <br></br>
        </div>
    )
}

export default Recipes;