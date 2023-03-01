import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from './App';

function SignUpForm() {

  const { setUser, setLoading } = useContext(UserContext)

  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function handleSubmit(e) {
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
        bio: "",
        profile_pic: ""
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          setTimeout(() => {
            window.location.reload();
          }, 1500);
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
        <h1>Sign Up</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <label htmlFor="password">Password Confirmation</label>
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
        <button className="button" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;