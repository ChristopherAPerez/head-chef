import React, { useContext, useState } from "react";

import menu from '../images/MENU Book.GIF'
import fridge from '../images/FRIDGE ICON 2.GIF'
import fruits from '../images/FRUITS SHAKE.GIF'
import graph from '../images/PIE CHART-BAR GRAPH 2.GIF'
import profile from '../images/CHEF PROFILE 2.GIF'
import peace from '../images/Logout PEACE.GIF'

import { NavLink } from "react-router-dom"
import { UserContext } from './App';

function NavRectangle() {

    const { user, setUser, setLoading } = useContext(UserContext)
    const [inventory, setInventory] = useState(user.inventories)

    const linkStyle = {
        padding: "20px",
    };

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null)
                setLoading(true)
            }
        });
    }

    function handleClick() {
        console.log(inventory)
        console.log(setInventory)
    }




    return (
        <>
            <br></br>
            <nav className="rectangle" >
                <table className="table" >
                    <tbody>
                        <tr>
                            <td>
                                <NavLink className="navlink" to="/menus" style={linkStyle}>
                                    <img src={menu} alt={menu} width="100" height="100" />
                                </NavLink>
                                Menu
                            </td>
                            <td>
                                <NavLink className="navlink" to="/inventory" style={linkStyle} onClick={handleClick}>
                                    <img src={fridge} alt={fridge} width="100" height="100" />
                                </NavLink>
                                Inventory
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <NavLink className="navlink" to="/recipes" style={linkStyle}>
                                    <img src={fruits} alt={fruits} width="100" height="100" />
                                </NavLink>
                                Recipes
                            </td>
                            <td>
                                <NavLink className="navlink" to="/stats" style={linkStyle}>
                                    <img src={graph} alt={graph} width="100" height="100" />
                                </NavLink>
                                Stats
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <NavLink className="navlink" to="/profile" style={linkStyle}>
                                    <img src={profile} alt={profile} width="100" height="100" />
                                </NavLink>
                                Profile
                            </td>
                            <td>
                                <NavLink className="navlink" to="/" style={linkStyle} onClick={handleLogoutClick} >
                                    <img src={peace} alt={peace} width="100" height="100" />
                                </NavLink>
                                Logout
                            </td>
                        </tr>
                    </tbody>
                </table>
            </nav>
            <br></br>
        </>

    );
}

export default NavRectangle;