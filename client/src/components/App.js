import React, { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header"
import NavRectangle from "./NavRectangle"

import Menus from "../pages/Menus"
import Recipes from "../pages/Recipes"
import Profile from "../pages/Profile"
import Stats from "../pages/Stats"
import FriendsList from "../pages/FriendsList"

import LoggedOut from "./LoggedOut"
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm";

import stir from '../images/Pot RICE blue.GIF'

import './App.css';
import MyRecipeList from "../pages/MyRecipeList";

export const UserContext = createContext();
export const MenuContext = createContext();
export const PublishContext = createContext();

function App() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null)
  const [menus, setMenus] = useState(null)
  const [friends, setFriends] = useState([])
  const [myRecipes, setMyRecipes] = useState([])

  const [unpublish, setUnPublish] = useState(null)
  const [unpublishRecipes, setUnPublishRecipes] = useState([])
  const [unpublishMenuToRecipes, setUnpublishMenuToRecipes] = useState([])

  const [stats, setStats] = useState([]);


  useEffect(() => {

    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          setFriends(user.friends)
          setMyRecipes(user.recipes)
          setLoading(false)
        })
      }
    });
  }, []);

  useEffect(() => {
    fetch("/index_published").then((r) => {
      if (r.ok) {
        r.json().then((menu) => {
          setMenus(menu)
        })
      }
    });
  }, []);

  useEffect(() => {
    fetch("/published").then((r) => {
      if (r.ok) {
        r.json().then((menu) => {
          setUnPublish(menu)
          setUnpublishMenuToRecipes(menu.menu_to_recipes)
        })
      }
    });
  }, []);

  useEffect(() => {
    fetch("/published_recipes").then((r) => {
      if (r.ok) {
        r.json().then((recipes) => {
          setUnPublishRecipes(recipes)
        })
      }
    });
  }, []);

  function updatedMyRecipes(update) {
    const updatedMyRecipes = myRecipes.map((recipe) => {
        if (recipe.id === update.id) {
            return update;
        } else {
            return recipe;
        }
    });
    setMyRecipes(updatedMyRecipes);
}

  function deleteMyRecipe(id) {
    const updatedMyRecipes = myRecipes.filter((recipe) => recipe.id !== id);
    setMyRecipes(updatedMyRecipes);
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
              <UserContext.Provider value={{ user, setUser, friends, setFriends }}>
                <PublishContext.Provider value={{ unpublishRecipes }}>
                  <Header />
                </PublishContext.Provider>
              </UserContext.Provider>
              <br></br>
              <UserContext.Provider value={{ user, setUser, setLoading, stats, setStats, friends, setFriends, myRecipes, setMyRecipes, deleteMyRecipe, updatedMyRecipes }}>
                <MenuContext.Provider value={{ menus, setMenus }} >
                  <PublishContext.Provider value={{ unpublish, setUnPublish, unpublishRecipes, setUnPublishRecipes, unpublishMenuToRecipes, setUnpublishMenuToRecipes }} >
                    <Routes>
                      <Route path="/menus" element={<Menus />}>
                      </Route>
                      <Route path="/friends" element={<FriendsList />}>
                      </Route>
                      <Route path="/recipes" element={<Recipes />}>
                      </Route>
                      <Route path="/my_recipes" element={<MyRecipeList />}>
                      </Route>
                      <Route path="/stats" element={<Stats />}>
                      </Route>
                      <Route path="/profile" element={<Profile />}>
                      </Route>
                      <Route path="/" element={<NavRectangle />}>
                      </Route>
                    </Routes>
                  </PublishContext.Provider>
                </MenuContext.Provider>
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

    </div>
  );

}

export default App;
