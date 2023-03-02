import React from "react";
import MealCard from "./MealCard";

function MenuHistoryCard({ menu }) {

    function handleClick(){
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
                {menu.menu_to_recipes.map((recipe, index) => {
                    const id = menu.id * Math.random()
                    return <MealCard key={id} recipe={recipe} index={index}/>
                })}
            </tbody>
        </table>
    )
}

export default MenuHistoryCard;