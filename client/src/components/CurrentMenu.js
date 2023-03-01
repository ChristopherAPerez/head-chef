import React, { useContext, useState } from 'react';
import { PublishContext } from './App';
import { NavLink } from "react-router-dom"
import menu from '../images/MENU Book closed.PNG'
import menuGif from '../images/MENU Book pink.GIF'

function CurrentMenu() {

    const { unpublishRecipes } = useContext(PublishContext)
    const [hovered, setHovered] = useState(false);

    const linkStyle = {
        padding: "20px",
    };

    const fontStyle = {
        fontSize: "14px",
    };

    return (
        <table className='currentMenu'>
            <tbody >
                <tr>
                    <td className='slot'>
                        <NavLink className="navlink" to="/menus" style={linkStyle}>
                            <img
                                src={hovered ? menuGif : menu}
                                alt={menu}
                                onMouseOver={() => setHovered(true)}
                                onMouseOut={() => setHovered(false)}
                                width="97px"
                                height="97px" />
                        </NavLink>
                        <span style={fontStyle}>Menu</span>
                    </td>
                    {unpublishRecipes.map((recipe, index) => {
                        return <td key={index} className='slot' >
                            <div className="navlink" style={linkStyle}>
                                <img src={recipe.recipe_pic} alt={recipe.recipe_pic} width="97px" height="97px" />
                            </div>
                            {index === 0 ? <span style={fontStyle}>Breakfast</span> : index === 1 ? <span style={fontStyle}>Lunch</span> : <span style={fontStyle}>Dinner</span>}
                        </td>

                    })}
                </tr>
            </tbody>
        </table>
    )
}

export default CurrentMenu;
