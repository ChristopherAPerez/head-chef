import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { UserContext } from './App';

import logo from '../images/HeadCHEF final.PNG'

function Header() {

    const navigate = useNavigate()

    const { user } = useContext(UserContext)

    function handleHome() {
        navigate("/")
      }

    return (
        <>
            <img className='logo' src={logo} alt={logo} onClick={handleHome}/>
            {user ? (
                <>
                </>
            ) : (
                <>
                    <br></br>
                    <Link className="button" to="/signup" >Signup</Link>
                    <Link className="button" to="/login" >Login</Link>
                    <br></br>
                    <br></br>
                    <br></br>
                </> 
            )}
        </>
    )
}

export default Header;