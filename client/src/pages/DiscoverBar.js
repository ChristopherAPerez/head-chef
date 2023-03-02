import react, { useContext, useState } from "react";
import { RecipeContext } from "./Recipes";

function DiscoverBar() {

    const { setAllRecipes } = useContext(RecipeContext)

    const [discoverBar, setDiscoverBar] = useState("All")
    const [search, setSearch] = useState("")
    const [selectedOption, setSelectedOption] = useState('my recipes');

    function handleAll(value){
        fetch("/recipes").then((r) => {
            if (r.ok) {
                r.json().then((recipes) => {
                    setAllRecipes(recipes)
                    setDiscoverBar(value)
                })
            }
        });
    }

    function handleBar(value){
        setDiscoverBar(value)
    }

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

    return (
        <>
            <button className='button' onClick={() => handleAll("All")} value="All">All</button>
            <button className='button' onClick={() => handleBar("Search")} value="Search">Search</button>
            <button className='button' onClick={() => handleBar("Filter")} value="Filter">Filter</button>
            <br></br>
            <br></br>
            {
                discoverBar === "All" ? (
                    <></>
                ) : discoverBar === "Filter" ? (
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
                ) : (
                    <form onSubmit={handleSearch}>
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <input className="button" type="submit" value="Search" />
                    </form>
                )
            }
        </>
    )
}

export default DiscoverBar