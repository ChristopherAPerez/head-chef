import React, { useContext } from "react";

import { PublishContext } from '../components/App';

function MenuRecipes( { menu_to_recipe, index, DeleteMenuToRecipe, DeleteUnpublishRecipes } ) {

    const { unpublishRecipes, unpublishMenuToRecipes } = useContext(PublishContext)

    function handleClick(){
        fetch(`/menu_to_recipes/${menu_to_recipe.id}`, {
            method: "DELETE",
        }).then((r) => {
            if (r.ok) {
                DeleteUnpublishRecipes(unpublishRecipes[index].id)
                DeleteMenuToRecipe(menu_to_recipe.id)
            } else {
                r.json().then((err) => {
                    alert(err.error)
                })
            }
        });
        console.log(unpublishMenuToRecipes[index].id)
    }

    return (
        <>
        <button onClick={handleClick} >remove index {index}</button>
        </>
    )
}

export default MenuRecipes;