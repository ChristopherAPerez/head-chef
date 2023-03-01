import React, { useState } from "react";
import MealCard from "./MealCard";

function MenuHistoryCard({ menu }) {

    const [recipes, setRecipes] = useState(menu.recipes)

    function handleClick() {
        console.log(menu)
    }

    return (
        <table className="menuHistoryTable">
            <tbody>
                <tr>
                    <td>
                        <p onClick={handleClick}>Date: {menu.menu_date}</p>
                    </td>
                </tr>
                {recipes.map((recipe, index) => {
                    const id = menu.id * Math.random()
                    return <MealCard key={id} recipe={recipe} index={index}/>
                })}
            </tbody>
        </table>
    )
}

export default MenuHistoryCard;