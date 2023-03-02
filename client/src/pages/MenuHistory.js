import React, { useContext } from "react";
import { MenuContext } from '../components/App';
import MenuHistoryCard from './MenuHistoryCard'


function MenuHistory() {

    const { menus } = useContext(MenuContext)

    return (
        <>
        <br></br>
            {menus.map((menu) => {
                const id = menu.id * Math.random()
                return <MenuHistoryCard key={id} menu={menu}/>
            })}

        </>
    )
}

export default MenuHistory;