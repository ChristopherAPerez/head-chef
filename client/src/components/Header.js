import React from 'react';
import { Link } from "react-router-dom";

import logo from "../images/HeadCHEF.PNG"

function Header( { user, setUser } ) {

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
      }

    return (
        <>
            <img className='logo' src={logo} alt={logo} />
            {user ? (
                <>
                    <br></br>
                    <button className="button" onClick={handleLogoutClick} >Logout</button>
                </>
            ) : (
                <>
                    <br></br>
                    <br></br>
                    <Link className="link" to="/signup">Signup</Link>
                    <Link className="link" to="/login">Login</Link>
                </>
            )}
        </>
    )
}

export default Header;