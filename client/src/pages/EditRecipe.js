import React, { useState, useContext } from "react";
import EditIngredients from "./EditIngredients";
import { UserContext } from '../components/App';


function EditRecipe({ setIngredients, ingredients, recipe, pic, setPic, description, setDescription, calories, setCalories, prep, setPrep }) {

    const { user } = useContext(UserContext)

    const [addNewIngredient, setAddNewIngredient] = useState("")

    function handleAddNewIngredient() {

        const updateIngredients = [...ingredients, addNewIngredient]

        fetch(`recipes/${recipe.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ingredients: updateIngredients
            }),
        })

            .then((r) => {
                if (r.ok) {
                    r.json().then((update) => {
                        setIngredients(updateIngredients)
                        setAddNewIngredient("")
                    });
                } else {
                    r.json().then((err) => {
                        alert(err.error)
                    })
                }
            })
    }

    return (
        <>
            <table className="tableDeetsLeft">
                <tbody>
                    <tr>
                        <td >
                            <p><b>{recipe.recipe_name}</b></p>
                            <img className="recipeImage" src={recipe.recipe_pic} alt={recipe.recipe_pic} width="300" height="300" />
                            <br></br>
                            <br></br>
                            <input
                                type="text"
                                name=""
                                autoComplete="off"
                                value={pic}
                                onChange={(e) => setPic(e.target.value)}
                            />
                            <br></br>
                            <br></br>
                            {user.id === recipe.user.id ? <input className="editButton" type="submit" value="Save" /> : <></>}
                        </td>
                    </tr>
                </tbody>
            </table>
            <table className="tableDeetsRight">
                <tbody>
                    <tr>
                        <td>
                            <table>
                                <tbody>
                                    <tr>
                                        <td >
                                            <p><b>Description: </b></p>
                                            <textarea
                                                type="text"
                                                name=""
                                                autoComplete="off"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                rows="8"
                                                cols="73"
                                            ></textarea>
                                            <br></br>
                                            <span><b>Calories: </b></span>
                                            <input
                                                type="number"
                                                name=""
                                                autoComplete="off"
                                                value={calories}
                                                onChange={(e) => setCalories(e.target.value)}
                                            />
                                            <br></br>
                                            <span><b>Prep-time: </b></span>
                                            <input
                                                type="number"
                                                name=""
                                                autoComplete="off"
                                                value={prep}
                                                onChange={(e) => setPrep(e.target.value)}
                                            />
                                            <br></br>
                                            <b>Ingredients: </b><br></br>
                                            <table>
                                                <tbody>
                                                    {ingredients.map((ingredient, index) => {
                                                        return <EditIngredients key={index} setIngredients={setIngredients} recipe={recipe} ingredients={ingredients} ingredient={ingredient} index={index} />
                                                    })}
                                                </tbody>
                                            </table>
                                            <br></br>
                                            <label>Add New Step:</label>
                                            <br></br>
                                            <input
                                                name=""
                                                autoComplete="off"
                                                value={addNewIngredient}
                                                onChange={(e) => setAddNewIngredient(e.target.value)}
                                            />
                                            {
                                                addNewIngredient === '' ? <button
                                                    className="editButton"
                                                    type="button"
                                                >Add New Ingredient</button>
                                                    :
                                                    <button
                                                        className="editButton"
                                                        type="button"
                                                        onClick={handleAddNewIngredient}
                                                    >Add New Ingredient</button>
                                            }

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default EditRecipe;