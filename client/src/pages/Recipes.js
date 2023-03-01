import React, { useContext, useState, useEffect, createContext } from "react";
import { UserContext } from '../components/App';
import CurrentMenu from "../components/CurrentMenu"

import RecipeList from './RecipeList'
import MyRecipeList from './MyRecipeList'
import NewRecipeForm from './NewRecipeForm'
import { useNavigate } from "react-router-dom"

export const RecipeContext = createContext();

function Recipes() {

    const navigate = useNavigate()

    const { user } = useContext(UserContext)
    const [recipes, setRecipes] = useState(user.recipes)
    const [allRecipes, setAllRecipes] = useState([])
    const [page, setPage] = useState("Recipes")

    const [search, setSearch] = useState("")
    const [searchData, setSearchData] = useState([])

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

    useEffect(() => {

        fetch("/users_recipe_index").then((r) => {
            if (r.ok) {
                r.json().then((recipes) => {
                    setRecipes(recipes)
                })
            }
        });
    }, []);

    function handleSearch(e) {

        e.preventDefault()

        fetch(`/recipes_search?recipe_name=${search}`).then((r) => {
            if (r.ok) {
                r.json().then((recipes) => {
                    setAllRecipes(recipes)
                    console.log(recipes)
                })
            }
        });
    }

    function handleClick() {
        console.log(searchData)
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

    function deleteRecipe(id) {
        const updatedRecipes = allRecipes.filter((recipe) => recipe.id !== id);
        setAllRecipes(updatedRecipes);
    }

    const [selectedOption, setSelectedOption] = useState('my recipes');

    function handleFilter(e) {

        e.preventDefault()

        const url = selectedOption === "my recipes" ? "/users_recipe_index" : `/recipes_filter?meal=${selectedOption}`

        fetch(url).then((r) => {
            if (r.ok) {
                r.json().then((recipes) => {
                    setAllRecipes(recipes)
                    console.log(recipes)
                })
            }
        });
    }

    function handleMainMenu(){
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
            <form onSubmit={handleSearch}>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                <input className="button" type="submit" value="Search" />
            </form>

            <form onSubmit={handleFilter}>
                <input className="button" type="submit" value="Filter" />
                <input
                    type="radio"
                    value="my recipes"
                    checked={selectedOption === 'my recipes'}
                    onChange={(event) => setSelectedOption(event.target.value)}
                />
                My Recipes
                <input
                    type="radio"
                    value="Breakfast"
                    checked={selectedOption === 'Breakfast'}
                    onChange={(event) => setSelectedOption(event.target.value)}
                />
                Breakfast
                <input
                    type="radio"
                    value="Lunch"
                    checked={selectedOption === 'Lunch'}
                    onChange={(event) => setSelectedOption(event.target.value)}
                />
                Lunch
                <input
                    type="radio"
                    value="Dinner"
                    checked={selectedOption === 'Dinner'}
                    onChange={(event) => setSelectedOption(event.target.value)}
                />
                Dinner
            </form>

            {
                page === "Recipes" ?
                    <RecipeContext.Provider value={{ allRecipes, setAllRecipes, deleteRecipe }}>
                        <RecipeList />
                    </RecipeContext.Provider>
                    :
                    page === "My Recipes" ?
                        <RecipeContext.Provider value={{ recipes, setRecipes, deleteRecipe }}>
                            <MyRecipeList />
                        </RecipeContext.Provider>
                        :
                        <RecipeContext.Provider value={{ setPage, allRecipes, setAllRecipes, recipes, setRecipes }}>
                            <NewRecipeForm />
                        </RecipeContext.Provider>
            }

            <br></br>
        </div>
    )
}

export default Recipes;