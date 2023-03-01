import React, { useState } from "react";

function Ingredients({ ingredient, index }) {

    const [test, setTest] = useState(ingredient)

    function handlePrint() {
        console.log(test)
    }

    function handleSet() {
        setTest(ingredient)
    }

    return (

        <tr>
            <td>
                ‣ <strong className="indent">{ingredient}</strong>
            </td>
        </tr>

    )
}

export default Ingredients;