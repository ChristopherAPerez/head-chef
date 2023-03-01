import React, { useContext, useState } from "react";

import MenuRecipes from './MenuRecipes';
import DeleteButton from './DeleteButton'

import { UserContext } from '../components/App';
import { MenuContext } from '../components/App';
import { PublishContext } from '../components/App';

function NewMenuForm() {

    const { user } = useContext(UserContext)
    const { unpublish, setUnPublish, unpublishRecipes, setUnPublishRecipes, unpublishMenuToRecipes, setUnpublishMenuToRecipes } = useContext(PublishContext)
    const { menus, setMenus } = useContext(MenuContext)

    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    function handleCreate() {
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

    function sendSms() {
        fetch('/send_sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

    function publishMenu() {
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

    function DeleteUnpublishRecipes(id) {
        const updatedUnpublishedRecipe = unpublishRecipes.filter((recipe) => recipe.id !== id);
        setUnPublishRecipes(updatedUnpublishedRecipe);
    }

    function DeleteMenuToRecipe(id) {
        const updatedMenuToRecipe = unpublishMenuToRecipes.filter((menu_to_recipe) => menu_to_recipe.id !== id);
        setUnpublishMenuToRecipes(updatedMenuToRecipe);
    }

    ///////////////

    function unpublished() {

        // sendSms()

        setTimeout(() => {
            publishMenu()
        }, 4000);

    }

    function clearRecipe() {
        fetch(`/clear_menu`, {
            method: "DELETE",
        }).then((r) => {
            if (r.ok) {
                setUnPublishRecipes([])
                setUnpublishMenuToRecipes([])
            } else {
                r.json().then((err) => {
                    alert(err.error)
                })
            }
        });
    }

    ///////////////


    return (
        <>
            <br></br>
            <br></br>
            <div className="egg">
                {unpublish ?
                    <div>
                        <br></br>
                        <p><b>{unpublish.menu_date}</b></p>
                        {unpublishRecipes.map((recipe, index) => {
                            return <MenuRecipes key={index} recipe={recipe} index={index} />
                        })}
                        <br></br>
                    </div>
                    :
                    <>
                    </>
                }

                <br></br>
            </div>
            <br></br>
            {unpublish ? (
                <>
                    <br></br>
                    <button className="button" onClick={clearRecipe}>Clear Menu</button><br></br>
                    <label><b>Phone Number: </b></label>
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button className="button" onClick={unpublished}>Publish</button>
                </>
            ) : (
                <>
                    <button className="button" onClick={handleCreate}>Create New Form</button>
                </>
            )}
        </>
    )
}

export default NewMenuForm;