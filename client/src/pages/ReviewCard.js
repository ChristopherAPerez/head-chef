import React from "react";

function ReviewCard({ review }) {

    const stars = '🌟'

    const rating = stars.repeat(review.rating)

    return (

        <>
            <table className="reviewTable">
                <tbody>
                    <tr>
                        <td>
                            <b>By: {review.username}</b>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Rating: </b> {rating}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Comment: </b> {review.comment}
                        </td>
                    </tr>
                </tbody>
            </table>
            <br></br>
        </>

    )
}

export default ReviewCard;