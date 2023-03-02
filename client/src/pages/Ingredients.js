import React from "react";

function Ingredients({ ingredient }) {


    return (

        <tr>
            <td>
                ‣ <strong className="indent">{ingredient}</strong>
            </td>
        </tr>

    )
}

export default Ingredients;