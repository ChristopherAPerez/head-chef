import React, {useContext} from "react";
import { UserContext } from './App';

function LoggedIn() {

    const { user, setUser } = useContext(UserContext)

    return (
        <>
            <p>{user.username}</p>
        </>
    )
}

export default LoggedIn;