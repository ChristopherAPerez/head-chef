import React, { useState, useContext, useEffect } from "react";
import EditProfile from "./EditProfile"
import EditPic from "./EditPic"

import { UserContext } from '../components/App';
import { useNavigate } from "react-router-dom"

function Profile() {

  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)
  const [editPic, setEditPic] = useState(false)

  const { user } = useContext(UserContext)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleMainMenu(){
    navigate("/")
}

  return (
    <>
    <button className="button" onClick={handleMainMenu}>Main Menu</button>
    <br></br>
    <br></br>
      {isEditing ? (
        <>
            <EditProfile isEditing={isEditing} setIsEditing={setIsEditing} />
        </>
      ) : (
        <>
          <table className="profileTable">
            <tbody>
              <tr>
                <td>
                  <img className="profilePic" src={user.profile_pic} alt={user.profile_pic} width="150" height="150" />
                  <br></br>
                  <br></br>
                  <button className="editButton" onClick={() => setIsEditing(!isEditing)} >Edit Profile</button>
                </td>
                <td>
                  <p><b>Username: </b>{user.username}</p>
                  <p><b>About Me: </b>{user.bio}</p>
                </td>
              </tr >
            </tbody >
          </table >
        </>
      )}
    </>
  );
}

export default Profile;