import React from "react";

import { PublishContext } from '../components/App';

function MenuRecipes( { recipe, index } ) {

    // const { unpublish } = useContext(PublishContext)

    const name = recipe.recipe_name.substring(0,29)

    function handleClick(){
        // fetch(`/menu_to_recipes/`, {
        //     method: "DELETE",
        // }).then((r) => {
        //     if (r.ok) {
        //         delete unpublish[index]
        //     } else {
        //         r.json().then((err) => {
        //             alert(err.error)
        //         })
        //     }
        // });
    }

    return (
        <>
        {index === 0 ? <p><b>Breakfast</b></p> : index === 1 ? <p><b>Lunch</b></p> : <p><b>Dinner</b></p>}
        {name.length > 30 ? <p>{name}...</p> : <p>{name}</p>}
        </>
    )
}

export default MenuRecipes;