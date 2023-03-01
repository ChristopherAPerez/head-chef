import React, { useState, useContext } from "react";
import chef1 from '../images/CHEF PROFILE 2.PNG';
import chef2 from '../images/CHEF PROFILE 3.PNG';
import chef3 from '../images/CHEF PROFILE 4.PNG';
import chef4 from '../images/CHEF PROFILE 5.PNG';
import chef5 from '../images/CHEF PROFILE 6.PNG';
import chef6 from '../images/CHEF PROFILE 7.PNG';
import chef7 from '../images/CHEF PROFILE 8.PNG';
import chef8 from '../images/CHEF PROFILE 9.PNG';

import { UserContext } from '../components/App';

function EditProfile({ isEditing, setIsEditing }) {


    const { user, setUser } = useContext(UserContext)

    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio);

    const [pic, setPic] = useState(user.profile_pic);

    const pic_collection = [chef1, chef2, chef3, chef4, chef5, chef6, chef7, chef8]

    function handleSubmit(e) {

        e.preventDefault();

        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                profile_pic: pic,
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

    function handleClick(pic) {
        setPic(pic)
    }

    return (
        <form onSubmit={handleSubmit}>
            <table className="profileTable">
                <tbody>
                    <tr>
                        <td>
                            <img className="profilePic" src={pic} alt={pic} width="150" height="150" />
                            <br></br>
                            <br></br>
                            {pic_collection.map((pic, index) => {
                                return <img key={index} src={pic} alt={pic} width="40" height="40" onClick={() => handleClick(pic)} />
                            })}
                        </td>
                        <td>
                            <p><b>Username: </b></p><input
                                type="text"
                                name=""
                                autoComplete="off"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <p><b>About Me: </b></p><textarea
                                type="textarea"
                                name=""
                                autoComplete="off"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows="8" cols="30"
                            />
                            <input className="editButton" type="submit" value="Save" />
                        </td>
                    </tr >
                </tbody >
            </table >
        </form >
    );
}

export default EditProfile;