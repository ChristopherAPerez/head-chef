import React, { useContext, useState } from "react";
import { UserContext } from '../components/App';
import { PublishContext } from '../components/App';
import { RecipeContext } from './Recipes';
import EditRecipe from "./EditRecipe";
import ReactModal from 'react-modal';

function MyRecipeCard( { recipe, updatedRecipes } ) {

    const { user  } = useContext(UserContext)
    const { unpublish, unpublishRecipes, setUnPublishRecipes, unpublishMenuToRecipes, setUnpublishMenuToRecipes } = useContext(PublishContext)
    const { deleteRecipe } = useContext(RecipeContext)

    const [edit, setEdit] = useState(false);

    const [meal, setMeal] = useState(recipe.meal);
    const [pic, setPic] = useState(recipe.recipe_pic);
    const [name, setName] = useState(recipe.recipe_name);
    const [description, setDescription] = useState(recipe.description);
    const [calories, setCalories] = useState(recipe.calories);
    const [prep, setPrep] = useState(recipe.prep_time);
    const [steps, setSteps] = useState(recipe.steps);

    function handleClick() {
        console.log(recipe.user)
    }

    function handleMenu() {

        fetch("menu_to_recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                menu_id: unpublish.id,
                recipe_id: recipe.id
            }),
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => {
                        setUnpublishMenuToRecipes([...unpublishMenuToRecipes, data])
                        setUnPublishRecipes([...unpublishRecipes, recipe])
                    });
                } else {
                    r.json().then((err) => {
                        alert(err.error)
                    })
                }
            })


    }

    function handleEdit() {
        setEdit(!edit)
    }

    function handleSubmit(e) {

        e.preventDefault();


        fetch(`recipes/${recipe.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                meal: meal,
                recipe_pic: pic,
                recipe_name: name,
                description: description,
                calories: calories,
                prep_time: prep,
                steps: steps
            }),
        })

            .then((r) => {
                if (r.ok) {
                    r.json().then((update) => {
                        updatedRecipes(update)
                        setEdit(!edit)
                    });
                } else {
                    r.json().then((err) => {
                        alert(err.error)
                    })
                }
            })



    }

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModalHandler = () => {
        setModalIsOpen(true);
    };

    const closeModalHandler = () => {
        setEdit(false)
        setModalIsOpen(false);
    };

    function itsThere() {
        console.log(recipe.active)
    }

    function handleDelete() {
        fetch(`/recipes/${recipe.id}`, {
            method: "DELETE",
        }).then((r) => {
            if (r.ok) {
                deleteRecipe(recipe.id);
            } else {
                r.json().then((err) => {
                    alert(err.error)
                })
            }
        });
    }

    return (
        <>
            <div className="recipeTable">
                <table>
                    <tbody>
                        <tr>
                            <td >
                                <p onClick={handleClick}>{recipe.recipe_name}</p>
                                <img src={recipe.recipe_pic} alt={recipe.recipe_pic} onClick={itsThere} width="75" height="75" />
                            </td>
                            <td >
                                <p onClick={handleClick}><b>Description: </b>{recipe.description.substring(0, 200)}...</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr >
                            <td>
                                <p onClick={handleClick}>{recipe.recipe_name}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr >
                            <td >
                                <button className="button" onClick={openModalHandler}>View</button>
                                {unpublish ? <button className="button" onClick={handleMenu}>Add to Menu</button> : <></>}
                                {user.id === recipe.user.id ? <button className="button" onClick={handleDelete}>Delete</button> : <></>}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>






            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModalHandler}
                ariaHideApp={false}
                className="modal"
            >
                <>
                    {edit ? (
                        <form onSubmit={handleSubmit}>
                            <EditRecipe recipe={recipe} meal={meal} setMeal={setMeal} pic={pic} setPic={setPic} name={name} setName={setName} description={description} setDescription={setDescription} calories={calories} setCalories={setCalories} prep={prep} setPrep={setPrep} steps={steps} setSteps={setSteps} />
                            <br></br>
                            {user.id === recipe.user.id ? <input type="submit" value="save" /> : <></>}
                        </form>
                    ) : (
                        <form>
                            <h3>{recipe.meal}</h3>
                            <img src={recipe.recipe_pic} alt={recipe.recipe_pic} width="400" height="400" />
                            <h1>{recipe.recipe_name}</h1><br></br>
                            <p><b>Description: </b>{recipe.description}</p>
                            <p><b>Calories: </b>{recipe.calories}</p>
                            <p><b>Prep-time: </b>{recipe.prep_time}</p>
                            <div><b>steps: </b>{steps.map((step, index) => {
                                return <ul key={index}>{step}</ul>
                            })}</div>
                            {user.id === recipe.user.id ? <button onClick={handleEdit}>edit</button> : <></>}
                        </form>
                    )}
                    <div>
                        <b>Reviews: </b><br></br>
                        {recipe.reviews.map((review, index) => {
                            return <ul key={review.id}><h3>{review.username}</h3><p>Rating: {review.rating}/5</p><br></br><p>{index + 1}. {review.comment}</p></ul>
                        })}
                    </div>
                </>


                <button className="button" onClick={closeModalHandler}>Close Modal</button>
            </ReactModal>

        </>
    )
}

export default MyRecipeCard;