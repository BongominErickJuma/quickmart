import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import usePerson from "../hooks/usePerson";

const Login = () => {
  const { setUser, setUserIsLoggedIn } = usePerson();

  const [login, setLogin] = useState({ name: "", password: "" });
  const navigate = useNavigate();
  const { pending, error, fetchData } = useFetch(
    "https://jwt-server-test-bongominerickjuma.onrender.com/login"
  );

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const response = await fetchData({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    });

    if (response) {
      localStorage.setItem("JWTUser", JSON.stringify(response));
      setUser(response); // Update user context
      setUserIsLoggedIn(true);
      navigate("/quickmart");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-3 bg-white shadow-lg rounded-md">
      <form onSubmit={handleSubmitLogin} className="space-y-4">
        <h2 className="text-2xl text-center text-forest-green uppercase">
          Please Login
        </h2>

        <fieldset disabled={pending} className="space-y-4">
          <>
            <label
              htmlFor="name"
              className="block text-forest-green font-semibold"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              id="name"
              name="name"
              value={login.name}
              onChange={handleInput}
              required
              className="w-full p-2 border rounded-md focus:outline-none"
            />
          </>

          <>
            <label
              htmlFor="password"
              className="block text-forest-green font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              id="password"
              name="password"
              value={login.password}
              onChange={handleInput}
              required
              className="w-full p-2 border rounded-md focus:outline-none"
            />
          </>
        </fieldset>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full gradient-warm-sunset text-pale-lime font-bold py-2 px-4 rounded-md transition disabled:opacity-50 cursor-pointer"
        >
          {pending ? "Logging in..." : "Submit"}
        </button>
      </form>

      <small>Don't have account?</small>
      <Link to={"/quickmart/signup"} className="text-forest-green text-sm ml-2">
        SignUp
      </Link>
    </div>
  );
};

export default Login;
