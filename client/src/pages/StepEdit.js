import React, { useState } from 'react';

function StepEdit({ step, index, steps, setSteps }) {

    const [newStep, setNewStep] = useState(step)

    return (
        <>
            <button>update</button>
        </>
    )
}

export default StepEdit;