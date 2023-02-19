import React, { useState, useContext } from "react";
import { UserContext } from '../components/App';

function EditPic( { editPic, setEditPic } ) {

    const { user, setUser } = useContext(UserContext)

    const [pic, setPic] = useState(user.profile_pic);

    function handleSubmit(e) {

        e.preventDefault();

        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                profile_pic: pic
            }),
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((update) => {
                        setUser(update)
                        setEditPic(!editPic)
                    });
                } else {
                    r.json().then((err) => {
                        alert(err.error)
                        setEditPic(!editPic)
                    })
                }
            })
    }

    return (
        <>

            <img src={user.profile_pic} alt={user.profile_pic} width="200" height="200" />

            <form onSubmit={handleSubmit}>

                <h3>Upload Pic:</h3>
                <input
                    type="text"
                    name=""
                    autoComplete="off"
                    value={pic}
                    onChange={(e) => setPic(e.target.value)}
                />

                <input className="button" type="submit" value="Save" />
            </form>
        </>
    );
}

export default EditPic;