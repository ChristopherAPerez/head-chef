import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"
// import { useLoginUser } from './UserContext'
import { UserContext } from './App';

function LoginForm() {

  // const loginUser = useLoginUser()
  const { setUser, setLoading } = useContext(UserContext)

  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          setTimeout(() => {
            setLoading(false)
          }, 3000);
        })
      } else {
        r.json().then((err) => {
            alert(err.errors)
        })
    }
    });
    navigate("/")
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" type="submit">Login</button>
      </form> 
    </div>
  );
}

export default LoginForm;