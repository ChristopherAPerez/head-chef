import React, { useState, useContext } from "react";
import { UserContext } from '../components/App';
import { useNavigate } from "react-router-dom"

function MyRecipeList() {

    const navigate = useNavigate()

    const [page, setPage] = useState("")
    const [myRecipesMenus, setMyRecipesMenus] = useState([])
    const { myRecipes } = useContext(UserContext)

    function handleMainMenu() {
        navigate("/")
    }

    function handleRecipeClick() {
        navigate("/recipes")
    }

    const length = myRecipesMenus.length

    return (
        <>
            <button className="button" onClick={handleMainMenu}>Main Menu</button>
            <br></br>
            <button className="button" onClick={handleRecipeClick}>Recipes</button>
            <button className="button">New Recipe</button>
            <br></br>
            <br></br>
            <div className='myRecipeContainer'>
                <table className='friendTable'>
                    <tbody>
                        <tr >
                            <td>
                                <b>My Recipes</b>
                            </td>
                        </tr>
                        {myRecipes.map((recipe) => {
                            function handleRecipeClick() {
                                fetch(`/my_recipes_menus/${recipe.id}`).then((r) => {
                                    if (r.ok) {
                                        r.json().then((menus) => {
                                            setMyRecipesMenus(menus)
                                            setPage("menu")
                                        })
                                    } else {
                                        r.json().then((err) => {
                                            alert(err.error)
                                        })
                                    }
                                });
                            }
                            return <tr key={recipe.id} onClick={handleRecipeClick} >
                                <td className="myRecipeTabletd">
                                    <b>{recipe.recipe_name}</b>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr >
                            <td>
                                <b>List of Menus</b><br></br>
                                {page === 'menu' ? <span>Your Recipe shows up <b>{length}</b> time in menus</span> : <></>}
                            </td>
                        </tr>
                    </tbody>
                </table>
                {
                    page === "menu" ?
                        <div className="listofMenus">
                            <table>
                                <tbody>
                                    {
                                        page === "menu" ?
                                            <>
                                                {myRecipesMenus.map((menu) => {
                                                    const id = menu.id * Math.random()
                                                    return <tr key={id}>
                                                        <td className="myRecipeMenusTabletd" >{menu.user.username} {menu.menu_date}</td>
                                                    </tr>
                                                })}
                                            </>
                                            :
                                            <></>
                                    }
                                </tbody>
                            </table>
                        </div>
                        :
                        <></>
                }
            </div>
        </>
    )
}

export default MyRecipeList;