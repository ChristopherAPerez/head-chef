import React, { useContext } from "react";
import { UserContext } from '../components/App';
import { MenuContext } from "../components/App";
import { PublishContext } from '../components/App';

function RecipeList({ recipe } ) {

    const { user } = useContext(UserContext)
    const { menus, setMenus } = useContext(MenuContext)
    const { unpublish, setUnPublish, unpublishRecipes, setUnPublishRecipes } = useContext(PublishContext)

    function handleClick() {
        console.log(unpublish)
    }

    function handleMenu(){

        fetch("menu_to_recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                menu_id: unpublish.id,
                recipe_id: recipe.id
            }),
        })

            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => {
                        unpublish.recipes.push(recipe)
                        // setUnPublishRecipes([...unpublishRecipes, recipe])
                    });
                } else {
                    r.json().then((err) => {
                        alert(err.error)
                    })
                }
            })
    }

    return (
        <>
            <img src={recipe.recipe_pic} alt={recipe.recipe_pic}/>
            <br></br>
            {unpublish ? <button onClick={handleMenu}>Add to Menu</button> : <></>}
            <p onClick={handleClick}>{recipe.recipe_name}</p>
            
        </>
    )
}

export default RecipeList;