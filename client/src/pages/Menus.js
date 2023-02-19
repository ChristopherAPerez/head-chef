import React, { useContext, useState, useEffect, createContext } from "react";
import { UserContext } from '../components/App';
import { MenuContext } from '../components/App';

import MenuHistory from './MenuHistory'
// import Menu from './Menu'
import NewMenuForm from './NewMenuForm'

export const PublishContext = createContext();

function Menus() {

    const { menus, setMenus } = useContext(MenuContext)

    // const [menus, setMenus] = useState(null)
    // const [allMenus, setAllMenus] = useState([])
    // const [unpublish, setUnPublish] = useState(null)
    const [page, setPage] = useState("Menu")

    // useEffect(() => {
    //     fetch("/menus").then((r) => {
    //         if (r.ok) {
    //             r.json().then((menu) => {
    //                 setMenus(menu)
    //             })
    //         }
    //     });
    // }, []);

    // useEffect(() => {
    //     fetch("/published").then((r) => {
    //         if (r.ok) {
    //             r.json().then((menu) => {
    //                 setUnPublish(menu)
    //             })
    //         }
    //     });
    // }, []);

    // function handleClick() {
    //     console.log(unpublish)
    // }

    function handleClick() {
        // console.log(menus)
        // console.log(allMenus)
    }

    function handleNewRecipeClick() {
        setPage("New Menu")
    }

    function handleMyRecipesClick() {
        setPage("Menu History")
    }

    return (
        <>
            <button onClick={handleClick}>Menu</button>
            <br></br>
            <button onClick={handleMyRecipesClick}>Menu History</button>
            <button onClick={handleNewRecipeClick}>New Menu</button>
            <br></br>

            {
                page === "Menu History" ?

                    <MenuHistory />
                    :
                    <NewMenuForm />
            }

            <br></br>
        </>
    )
}

export default Menus;