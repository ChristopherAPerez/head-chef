import React, { useState, useContext } from "react";
import EditProfile from "./EditProfile"
import EditPic from "./EditPic"

import { UserContext } from '../components/App';

function Profile() {

  const [isEditing, setIsEditing] = useState(false)
  const [editPic, setEditPic] = useState(false)

  const { user } = useContext(UserContext)

  return (
    <>
      {editPic ? (<>
        <EditPic editPic={editPic} setEditPic={setEditPic} />
      </>
      ) : (
        <>
          <img src={user.profile_pic} alt={user.profile_pic} width="200" height="200" />
          <br></br>
          <br></br>
          <button onClick={() => setEditPic(!editPic)} >Edit Pic</button>
        </>
      )}

      {isEditing ? (<>
        <EditProfile isEditing={isEditing} setIsEditing={setIsEditing} />
      </>
      ) : (
        <>
          <h3>Username: {user.username}</h3>
          <h3>About me: {user.bio}</h3>
          <button className="button" onClick={() => setIsEditing(!isEditing)} >Edit Profile</button>
        </>
      )}

    </>
  );
}

export default Profile;