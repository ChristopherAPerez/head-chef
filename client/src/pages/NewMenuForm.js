import React, { useContext } from "react";

import MenuRecipes from './MenuRecipes';

import { UserContext } from '../components/App';
import { MenuContext } from '../components/App';
import { PublishContext } from '../components/App';

function NewMenuForm() {

    const { user } = useContext(UserContext)
    const { unpublish, setUnPublish, unpublishRecipes, setUnPublishRecipes } = useContext(PublishContext)
    const { menus, setMenus } = useContext(MenuContext)

    function handleSubmit(e) {

        e.preventDefault();

        const date = new Date();
        const dateString = date.toDateString();

        fetch("menus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                menu_date: dateString,
                user_id: user.id,
                publish: false
            }),
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((menu) => {
                        setUnPublish(menu)
                    });
                } else {
                    r.json().then((err) => {
                        alert(err.error)
                    })
                }
            })

    }

    function published() {
        setUnPublish(unpublish)
    }

    function unpublished() {

        fetch(`menus/${unpublish.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                publish: true
            }),
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((menu) => {
                        setMenus([...menus, menu])
                        setUnPublish(null)
                        setUnPublishRecipes([])
                        console.log(menu)
                    })
                } else {
                    r.json().then((err) => {
                        alert(err.error)
                    })
                }
            })
    }

    function test(){
        console.log(unpublish)
    }


    return (
        <>
            {unpublish ?
                <div>
                    <p onClick={test}>{unpublish.menu_date}</p>
                    {unpublish.recipes.map((recipe, index) => {
                        return <MenuRecipes key={index} recipe={recipe} index={index} />
                    })}
                    <p onClick={unpublished} >published</p>
                </div>
                :
                <>
                    <form onSubmit={handleSubmit}>
                        <input type="submit" value="Create New Form" />
                    </form>
                    <p onClick={published} >unpublished</p>
                </>
            }

        </>
    )
}

export default NewMenuForm;