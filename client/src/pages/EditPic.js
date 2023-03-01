import React, { useState, useContext } from "react";
import { UserContext } from '../components/App';
import chef1 from '../images/CHEF PROFILE 2.PNG';
import chef2 from '../images/CHEF PROFILE 3.PNG';
import chef3 from '../images/CHEF PROFILE 4.PNG';
import chef4 from '../images/CHEF PROFILE 5.PNG';
import chef5 from '../images/CHEF PROFILE 6.PNG';
import chef6 from '../images/CHEF PROFILE 7.PNG';
import chef7 from '../images/CHEF PROFILE 8.PNG';
import chef8 from '../images/CHEF PROFILE 9.PNG';

function EditPic({ editPic, setEditPic }) {

    const { user, setUser } = useContext(UserContext)
    

    const [pic, setPic] = useState(user.profile_pic);

    const pic_collection = [chef1, chef2, chef3, chef4, chef5, chef6, chef7, chef8]

    function handleClick(pic){
        setPic(pic)
    }

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
            <img src={pic} alt={pic} width="150" height="150" />
            <div>
                {pic_collection.map((pic, index) => {
                    return <img key={index} src={pic} alt={pic} width="40" height="40" onClick={() => handleClick(pic)}/>
                })}
            </div>
            <form onSubmit={handleSubmit}>
                <input className="button" type="submit" value="Save" />
            </form>
        </>
    );
}

export default EditPic;