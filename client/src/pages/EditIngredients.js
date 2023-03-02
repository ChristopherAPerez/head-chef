import React from "react";

function EditIngredients({ recipe, setIngredients, ingredients, ingredient, index }) {

    function handleRemove() {
        const updateIngredients = [...ingredients]
        updateIngredients.splice(index, 1)

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
            <tr>
                <td>
                <button className="editButton" type="button" onClick={handleRemove}>Remove</button> {ingredient}
                </td>
            </tr>
        </>
    )
}

export default EditIngredients;