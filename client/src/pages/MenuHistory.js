import React, { useContext } from "react";
import { MenuContext } from "./Menus";
import MenuHistoryCard from './MenuHistoryCard'

function MenuHistory() {

    const { menus } = useContext(MenuContext)

    function handleClick(){
        console.log(menus)
    }

    return (
        <>
        <p onClick={handleClick}>click</p>
            {menus.map((menu) => {
                return <MenuHistoryCard key={menu.created_at} menu={menu}/>
            })}
        </>
    )
}

export default MenuHistory;