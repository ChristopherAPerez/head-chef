import React, { useState, useContext } from 'react';
import { UserContext } from '../components/App';

function Step({ recipe, step, index, steps, setSteps }) {

    const { user } = useContext(UserContext)

    const [edit, setEdit] = useState(false)
    const [newStep, setNewStep] = useState(step)

    function handleEdit() {
        console.log(step)
        setEdit(true)
    }

    function handleSave() {

        const updateStep = [...steps]
        updateStep[index] = steps[index].replace(step, newStep)

        fetch(`recipes/${recipe.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                steps: updateStep
            }),
        })

            .then((r) => {
                if (r.ok) {
                    r.json().then((update) => {
                        setSteps(updateStep)
                        setEdit(false)
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
            {edit ? (
                <tr>
                    <td>
                        <button className='editButton' onClick={handleSave}>Save</button>
                        <input
                            name=""
                            autoComplete="off"
                            value={newStep}
                            onChange={(e) => setNewStep(e.target.value)}
                            style={{width: "500px"}}
                        />
                        <br></br>
                    </td>
                </tr>
            ) : (
                <tr>
                    <td>
                        {user.id === recipe.user.id ? <button className='editButton' onClick={handleEdit}>Edit</button> : <></>}
                        Step {index + 1}. {step}
                    </td>
                </tr>
            )}

        </>
    )
}

export default Step;