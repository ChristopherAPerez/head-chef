import React, { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header"
import NavRectangle from "./NavRectangle"

// import LoggedIn from "./LoggedIn"
import Menus from "../pages/Menus"
import Inventory from "../pages/Inventory"
import Recipes from "../pages/Recipes"
import Profile from "../pages/Profile"
import Stats from "../pages/Stats"

import LoggedOut from "./LoggedOut"
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm";

import stir from '../images/Pot RICE.GIF'

import './App.css';

export const UserContext = createContext();

function App() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null)
  const [menus, setMenus] = useState([])
  const [recipes, setRecipes] = useState([])
  const [inventory, setInventory] = useState([])

  useEffect(() => {

    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          setMenus(user.menus)
          setRecipes(user.recipes)
          setInventory(user.inventories)
          setLoading(false)
        })
      }
    });
  }, []);

  function handleClick() {
    console.log(user)
    console.log(menus)
    console.log(recipes)
    console.log(inventory)
  }

  return (
    <div className='App'>

      {user ? (
        <>
          {loading ? (
            <>
              <UserContext.Provider value={{ user, setUser }}>
                <Header />
              </UserContext.Provider>
              <div>
                <img src={stir} alt={stir} width="200" height="200" />
                <p>Welcome, {user.username}!</p>
              </div>
            </>
          ) : (
            <>
              <UserContext.Provider value={{ user, setUser }}>
                <Header />
              </UserContext.Provider>
              <br></br>
              <UserContext.Provider value={{ user, setUser, setLoading }}>
                <Routes>
                  <Route path="/menus" element={<Menus />}>
                  </Route>
                  <Route path="/inventory" element={<Inventory />}>
                  </Route>
                  <Route path="/recipes" element={<Recipes />}>
                  </Route>
                  <Route path="/stats" element={<Stats />}>
                  </Route>
                  <Route path="/profile" element={<Profile />}>
                  </Route>
                  <Route path="/" element={<NavRectangle />}>
                  </Route>
                </Routes>
              </UserContext.Provider>
            </>
          )}
        </>
      ) : (
        <UserContext.Provider value={{ user, setUser, setLoading }}>
          <Header />
          <Routes>
            <Route path="/signup" element={<SignUpForm />}>
            </Route>
            <Route path="/login" element={<LoginForm />}>
            </Route>
            <Route path="/" element={<LoggedOut />}>
            </Route>
          </Routes>
        </UserContext.Provider>
      )}

      <button onClick={handleClick}>App</button>

    </div>
  );

}

export default App;
