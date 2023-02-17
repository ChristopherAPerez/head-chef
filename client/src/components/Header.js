import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { UserContext } from './App';

import logo from '../images/HeadCHEFv 2.PNG'

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
                    <br></br>
                    <Link className="link" to="/signup" >Signup</Link>
                    <Link className="link" to="/login" >Login</Link>
                </> 
            )}
        </>
    )
}

export default Header;