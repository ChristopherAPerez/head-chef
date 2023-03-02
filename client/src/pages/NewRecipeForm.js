import React, { useContext, useState, useEffect } from "react";
import { UserContext } from '../components/App';
import { RecipeContext } from './Recipes';

function NewRecipeForm() {

    const { user, myRecipes, setMyRecipes } = useContext(UserContext)
    const { setPage, allRecipes, setAllRecipes, recipes, setRecipes } = useContext(RecipeContext)

    const [name, setName] = useState("")
    const [meal, setMeal] = useState("Breakfast")
    const [steps, setSteps] = useState([])
    const [step, setStep] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [ingredient, setIngredient] = useState("")
    const [description, setDescription] = useState("")
    const [calories, setCalories] = useState(0)
    const [prep, setPrep] = useState(0)
    const [pic, setPic] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    function addStep(e) {
        e.preventDefault();
        setSteps([...steps, step])
        setStep("")
    }

    function addIngredient(e) {
        e.preventDefault();
        setIngredients([...ingredients, ingredient])
        setIngredient("")
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                recipe_name: name,
                meal: meal,
                steps: steps,
                ingredients: ingredients,
                description: description,
                calories: calories,
                prep_time: prep,
                recipe_pic: pic,
                user_id: user.id
            }),
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((recipe) => {
                        setRecipes([...recipes, recipe])
                        setAllRecipes([...allRecipes, recipe])
                        setMyRecipes([...myRecipes, recipe])

                        setName("")
                        setMeal("Breakfast")
                        setSteps([])
                        setStep("")
                        setIngredients([])
                        setIngredient("")
                        setDescription("")
                        setCalories(0)
                        setPrep(0)
                        setPic("")
                        setPage("Recipes")
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
            <br></br>
            <div className="newRecipeForm">
                <h1><u>Create New Recipe!</u></h1>
                <form className="addRecipeForm" onSubmit={handleSubmit}>
                    <label>
                        <b>
                            Name:
                        </b>
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br></br>
                    <label>
                        <b>
                            Meal:
                        </b>
                    </label>
                    <select
                        value={meal}
                        onChange={(e) => setMeal(e.target.value)}
                    >
                        <option
                            value="Breakfast"
                        >
                            Breakfast
                        </option>
                        <option
                            value="Lunch"
                        >
                            Lunch
                        </option>
                        <option
                            value="Dinner"
                        >
                            Dinner
                        </option>
                    </select>
                    <br></br>
                    <label>
                        <b>
                            Description:
                        </b>
                    </label>
                    <br></br>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        cols="45"
                    >
                    </textarea>
                    <br></br>
                    <label>
                        <b>
                            Calories:
                        </b>
                    </label>
                    <input
                        type="number"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                    />
                    <br></br>
                    <label>
                        <b>
                            Prep-time:
                        </b>
                    </label>
                    <input
                        type="number"
                        value={prep}
                        onChange={(e) => setPrep(e.target.value)}
                    />
                    <br></br>
                    <label>
                        <b>
                            Pic:
                        </b>
                    </label>
                    <br></br>
                    <textarea value={pic}
                        onChange={(e) => setPic(e.target.value)}
                        rows="4"
                        cols="45"
                    >
                    </textarea>
                    <br></br>
                    <div className="addIngredient">
                        <button className="button" type="button" onClick={addIngredient}>Add Ingredient</button>
                        <input
                            className="ingredientInput"
                            type="text"
                            value={ingredient}
                            onChange={(e) => setIngredient(e.target.value)}
                        />
                        {ingredients.map((ingredient, index) => {
                            return <p key={index + 1}><b>{index + 1}.</b> {ingredient}</p>
                        })}
                    </div>
                    <br></br>
                    <div className="addStep">
                        <button className="button" type="button" onClick={addStep}>Add Step</button>
                        <textarea
                            className="stepInput"
                            type="text"
                            value={step}
                            onChange={(e) => setStep(e.target.value)}
                            rows="3"
                            cols="45"
                        />
                        {steps.map((step, index) => {
                            return <p key={index + 1}><b>Step {index + 1}.</b> {step}</p>
                        })}
                    </div>
                    <br></br>
                    <input
                        className="editButton"
                        type="submit" />
                    <br></br>
                </form>
                <br></br>
            </div>
        </>
    )
}

export default NewRecipeForm;