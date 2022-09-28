import Link from "next/link";
import React, { useState } from "react";
import { useUserAuth } from "../../../context/UserAuthContext";
import { LANDING_PAGE_PATH } from "../../../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      alert("successfully logged in");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Auth Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="d-grid gap-2">
            <button variant="primary" type="Submit">
              Log In
            </button>
          </div>
        </form>
        <hr />
        <div>
          <button className="g-btn" type="dark" />
        </div>
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link href={LANDING_PAGE_PATH}>Sign up</Link>
      </div>
    </>
  );
};

export default Login;
