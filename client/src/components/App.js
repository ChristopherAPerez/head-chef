import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header"
import LoggedIn from "./LoggedIn"

import LoggedOut from "./LoggedOut"
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm";

import './App.css';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
        })
      }
    });
  }, []);

  return (
    <div className='App'>

      {user ? (
        <>
          <Header user={user} setUser={setUser} />
        </>
      ) : (
        <Header />
      )}

      <main>
        {user ? (

          <Routes>
            <Route path="/" element={<LoggedIn user={user} />}>
            </Route>
          </Routes>

        ) : (

          <Routes>
            <Route path="/signup" element={<SignUpForm setUser={setUser} />}>
            </Route>
            <Route path="/login" element={<LoginForm setUser={setUser} />}>
            </Route>
            <Route path="/" element={<LoggedOut user={user} />}>
            </Route>
          </Routes>

        )}
      </main>

    </div>
  );

}

export default App;
