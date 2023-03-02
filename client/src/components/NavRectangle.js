import React, { useContext } from "react";

import menu from '../images/MENU Book pink.GIF'
import heart from '../images/HeartHAND v3.GIF'
import fruits from '../images/FRUITS SHAKE 2.0.GIF'
import graph from '../images/PIE CHART-BAR GRAPH pink.GIF'
import profile from '../images/CHEF PROFILE pink.GIF'
import peace from '../images/Logout PEACE pink.GIF'

import { useNavigate, NavLink } from "react-router-dom"
import { UserContext } from './App';

function NavRectangle() {

    const navigate = useNavigate()

    const { setUser, setLoading } = useContext(UserContext)

    const linkStyle = {
        padding: "20px",
    };

    function handleNavigation(value){
        navigate(value)
    }

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null)
                setLoading(true)
            }
        });
    }

    return (
        <>
            <nav className="rectangle" >
                <table className="navTable" >
                    <tbody>
                        <tr>
                            <td className="tableDown" onClick={() => handleNavigation("/menus")}>
                                <NavLink className="navlink" to="/menus" style={linkStyle}>
                                    <img
                                        src={menu}
                                        alt={menu}
                                        width="90"
                                        height="90"
                                    />
                                </NavLink>
                                Menu
                            </td>
                            <td className="tableDown" onClick={() => handleNavigation("/friends")}>
                                <NavLink className="navlink" to="/friends" style={linkStyle}>
                                    <img
                                        src={heart}
                                        alt={heart}
                                        width="90"
                                        height="90"
                                    />
                                </NavLink>
                                Friends
                            </td>
                        </tr>
                        <tr>
                            <td className="tableDown" onClick={() => handleNavigation("/recipes")}>
                                <NavLink className="navlink" to="/recipes" style={linkStyle}>
                                    <img
                                        src={fruits}
                                        alt={fruits}
                                        width="90"
                                        height="90"
                                    />
                                </NavLink>
                                Recipes
                            </td>
                            <td className="tableDown" onClick={() => handleNavigation("/stats")}>
                                <NavLink className="navlink" to="/stats" style={linkStyle} >
                                    <img
                                        src={graph}
                                        alt={graph}
                                        width="90"
                                        height="90"
                                    />
                                </NavLink>
                                Stats
                            </td>
                        </tr>
                        <tr>
                            <td className="tableDown" onClick={() => handleNavigation("/profile")}>
                                <NavLink className="navlink" to="/profile" style={linkStyle}>
                                    <img
                                        src={profile}
                                        alt={profile}
                                        width="90"
                                        height="90"
                                    />
                                </NavLink>
                                Profile
                            </td>
                            <td className="tableDown" onClick={() => handleNavigation("/")}>
                                <NavLink className="navlink" to="/" style={linkStyle} onClick={handleLogoutClick}>
                                    <img
                                        src={peace}
                                        alt={peace}
                                        width="90"
                                        height="90"
                                    />
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