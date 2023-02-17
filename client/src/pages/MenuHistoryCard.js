import React, { useState } from "react";
import MealCard from "./MealCard";

function MenuHistoryCard( { menu } ) {

    const [recipes, setRecipes] = useState(menu.recipes)

    function handleClick(){
        console.log(setRecipes)
    }

    return (
        <div>
            <p onClick={handleClick}>
                {menu.menu_date}
            </p>
            {recipes.map((recipe) => {
                return <MealCard key={recipe.key} recipe={recipe}/>
            })}
        </div>
    )
}

export default MenuHistoryCard;