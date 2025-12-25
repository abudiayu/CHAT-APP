import axios from '../axiosConfig'
import { useRef } from 'react'
import {Link  ,useNavigate } from 'react-router-dom'
import React from 'react'

function Register() {
  const navigate = useNavigate()
  const userNameDom = useRef(null)
  const fristNameDom = useRef(null)
  const lastNameDom = useRef(null)
  const emailDom = useRef(null)
  const passwordDom = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault()
    const usernameValue = userNameDom.current.value;
    const fristnameValue = fristNameDom.current.value;
    const lastnameValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if (
      !usernameValue ||
      !fristnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert("Please fill all required information");
      return;
    }
    try {
      await axios.post("/users/register", {
        username: usernameValue,
        fristname: fristnameValue,   
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });

      alert("User registered successfully ");
      navigate("/login")
    } catch (error) {
      console.log(error);
      alert("Registration failed ");
    }
  }
  return (
    <section>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <span>User Name</span>
          <input
            ref={userNameDom}
            type="text"
            name="username"
            placeholder="username"
            // required
          />
        </div>
        <div>
          <span>First Name</span>
          <input
            ref={ fristNameDom}
            type="text"
            name="fristname"
            placeholder="frist Name"
            // required
          />
        </div>

        <div>
          <span>Last Name</span>
          <input
            ref={lastNameDom}
            type="text"
            name="lastname"
            placeholder="Last Name"
            // required
          />
        </div>

        <div>
          <span>Email</span>
          <input
            ref={emailDom}
            type="email"
            name="email"
            placeholder="Email"
            // required
          />
        </div>

        <div>
          <span>Password</span>
          <input
            ref={passwordDom }
            type="password"
            name="password"
            placeholder="Password"
            // required
          />
        </div>

        <button type="submit">Register</button>
      </form>
      <Link to = {"/login"}>Login</Link>
    </section>
  )
}

export default Register
