import React from 'react'
import axios from '../axiosConfig'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()
  const emailDom = useRef()
  const passwordDom = useRef()

  async function handleSubmit(e) {
    e.preventDefault()
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if (
      !emailValue ||
      !passwordValue
    ) {
      alert("Please fill all required information");
      return;
    }
    try {
     const {data} =  await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });
      // to save Token in Local storage
      localStorage.setItem("token", data.token);
      // console.log({data})

      alert("User registered successfully ");
      navigate("/")
    } catch (error) {
      console.log(error?.response?.data);
      alert(error?.response?.data?.msg); // instade of alert wright in front end
    }
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
      </form>
      <Link to = {"/register"}>Register</Link>
    </section>
  )
}

export default Login;
