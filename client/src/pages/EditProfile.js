import React, { useState, useContext } from "react";

import { UserContext } from '../components/App';

function EditProfile( { isEditing, setIsEditing } ) {


    const { user, setUser } = useContext(UserContext)

    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio);

    function handleSubmit(e) {

        e.preventDefault();

        fetch(`/users/${user.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            bio: bio,
        }),
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((update) => {
                    setUser(update)
                    setIsEditing(!isEditing)
                });
            } else {
                r.json().then((err) => {
                    alert(err.error)
                    setIsEditing(!isEditing)
                })
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>

            <h3>Username: </h3>
            <input
                type="text"
                name=""
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <h3>About me: </h3>
            <input
                type="textarea"
                name=""
                autoComplete="off"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />

            <input className="button" type="submit" value="Save" />
        </form>
    );
}

export default EditProfile;