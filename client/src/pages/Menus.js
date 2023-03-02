import React, { useState } from "react";
import MenuHistory from './MenuHistory'
import NewMenuForm from './NewMenuForm'
import { useNavigate } from "react-router-dom"

function Menus() {

    const navigate = useNavigate()

    const [page, setPage] = useState("Menu")


    function handleNewRecipeClick() {
        setPage("New Menu")
    }

    function handleMyRecipesClick() {
        setPage("Menu History")
    }

    function handleMainMenu(){
        navigate("/")
    }

    return (
        <div className="menu">
            <button className="button" onClick={handleMainMenu}>Main Menu</button>
            <br></br>
            <button className="button" onClick={handleMyRecipesClick}>Menu History</button>
            <button className="button" onClick={handleNewRecipeClick}>New Menu</button>
            <br></br>

            {
                page === "Menu History" ?

                    <MenuHistory />
                    :
                    <NewMenuForm />
            }

            <br></br>
        </div>
    )
}

export default Menus;