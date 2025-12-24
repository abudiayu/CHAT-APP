import React from 'react'

function Register() {
  return (
    <section>
      <h2>Register</h2>

      <form>
        <div>
          <span>First Name</span>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            required
          />
        </div>

        <div>
          <span>Last Name</span>
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            required
          />
        </div>

        <div>
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>

        <div>
          <span>Password</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </section>
  )
}

export default Register
