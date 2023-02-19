import React, { useState } from "react";
import MealCard from "./MealCard";

function MenuHistoryCard( { menu } ) {

    const [recipes, setRecipes] = useState(menu.recipes)

    function handleClick(){
        console.log(menu)
    }

    return (
        <div>
            <p onClick={handleClick}>
                {menu.menu_date}
            </p>
            {recipes.map((recipe) => {
                return <MealCard key={recipe.id} recipe={recipe}/>
            })}
        </div>
    )
}

export default MenuHistoryCard;