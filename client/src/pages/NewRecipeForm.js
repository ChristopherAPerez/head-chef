import React, { useContext, useState } from "react";
import { UserContext } from '../components/App';
import { RecipeContext } from './Recipes';

function NewRecipeForm() {

    const { user } = useContext(UserContext)
    const { allRecipes, setAllRecipes, recipes, setRecipes } = useContext(RecipeContext)

    const [name, setName] = useState("")
    const [meal, setMeal] = useState("Breakfast")
    const [steps, setSteps] = useState([])
    const [step, setStep] = useState("")
    const [description, setDescription] = useState("")
    const [calories, setCalories] = useState(0)
    const [prep, setPrep] = useState(0)
    const [pic, setPic] = useState("")

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
                    });
                } else {
                    r.json().then((err) => {
                        alert(err.error)
                    })
                }
            })

    }

    function handleClick() {
        console.log(allRecipes)
        console.log(setAllRecipes)
        console.log(recipes)
        console.log(setRecipes)
        console.log(steps)
    }

    function addStep(e) {

        e.preventDefault();

        setSteps([...steps, step])

        setStep("")

    }

    return (
        <>

            <form onSubmit={handleSubmit}>
                <label>Name:</label><br></br>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <br></br>

                <label>Meal:</label><br></br>
                <select onChange={(e) => setMeal(e.target.value)} >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                </select>

                <br></br>

                <br></br>

                <label>Description:</label><br></br>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" cols="45"></textarea>

                <br></br>

                <label>Calories:</label><br></br>
                <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} />

                <br></br>

                <label>Prep Time:</label><br></br>
                <input type="number" value={prep} onChange={(e) => setPrep(e.target.value)} />

                <br></br>

                <label>Picture:</label><br></br>
                <textarea value={pic} onChange={(e) => setPic(e.target.value)} rows="4" cols="45"></textarea>

                <br></br>

                <input className="button" type="submit" />

            </form>

            <br></br>
            <br></br>

            <form onSubmit={addStep}>

                {steps.map((step, index) => {
                    return <p key={index +1}>{index + 1}: {step}</p>
                })}

                <label>Add Steps:</label><br></br>

                <input type="text" value={step} onChange={(e) => setStep(e.target.value)} />

                <input className="button" type="submit" />

            </form>

            <br></br>

            <button onClick={handleClick}>NewRecipeForm</button>
        </>
    )
}

export default NewRecipeForm;