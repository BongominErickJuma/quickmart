import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const SignUp = () => {
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    name: "",
    password: "",
    cpassword: "",
    cardDetails: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const { pending, error, fetchData } = useFetch(
    "https://jwt-server-test-bongominerickjuma.onrender.com/signup"
  );

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("cardDetails.")) {
      const cardField = name.split(".")[1];
      setSignup((prev) => ({
        ...prev,
        cardDetails: {
          ...prev.cardDetails,
          [cardField]: value,
        },
      }));
    } else {
      setSignup((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmitSignup = async (e) => {
    e.preventDefault();

    if (signup.password !== signup.cpassword) {
      alert("Passwords do not match");
      return;
    }

    console.log(signup);

    const response = await fetchData({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signup),
    }); // Fetch response directly

    if (response) {
      alert(response.message); // Notify user of success
      setSignup({
        name: "",
        password: "",
        cpassword: "",
        cardDetails: {
          cardNumber: "",
          expiryDate: "",
          cvv: "",
        },
      });
      navigate("/quickmart/login"); // Redirect to login page
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 shadow-lg p-6 bg-white rounded-md">
      <form onSubmit={handleSubmitSignup} className="space-y-4">
        <h2 className="text-forest-green uppercase text-center text-2xl">
          Please Signup
        </h2>
        <fieldset disabled={pending}>
          <>
            <label
              htmlFor="name"
              className="block font-semibold text-forest-green"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              id="name"
              name="name"
              value={signup.name}
              onChange={handleInput}
              required
              className="p-2 w-full border rounded-md mt-2 focus:outline-none"
            />
          </>
          <>
            <label
              htmlFor="password"
              className="block font-semibold text-forest-green"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              id="password"
              name="password"
              value={signup.password}
              onChange={handleInput}
              required
              className="p-2 w-full border rounded-md mt-2 focus:outline-none"
            />
          </>
          <>
            <label
              htmlFor="cpassword"
              className="block font-semibold text-forest-green"
            >
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              id="cpassword"
              name="cpassword"
              value={signup.cpassword}
              onChange={handleInput}
              required
              className="p-2 w-full border rounded-md mt-2 focus:outline-none "
            />
          </>
          <>
            <label
              htmlFor="cardNumber"
              className="block font-semibold text-forest-green"
            >
              Card Number
            </label>
            <input
              type="text"
              placeholder="Enter card number"
              id="cardNumber"
              name="cardDetails.cardNumber"
              value={signup.cardDetails.cardNumber}
              onChange={handleInput}
              required
              className="p-2 w-full border rounded-md mt-2 focus:outline-none"
            />
          </>
          <>
            <label
              htmlFor="expiryDate"
              className="block font-semibold text-forest-green"
            >
              Expiry Date
            </label>
            <input
              type="text"
              placeholder="MM/YY"
              id="expiryDate"
              name="cardDetails.expiryDate"
              value={signup.cardDetails.expiryDate}
              onChange={handleInput}
              required
              className="p-2 w-full border rounded-md mt-2 focus:outline-none"
            />
          </>
          <>
            <label
              htmlFor="cvv"
              className="block font-semibold text-forest-green"
            >
              CVV
            </label>
            <input
              type="text"
              placeholder="Enter CVV"
              id="cvv"
              name="cardDetails.cvv"
              value={signup.cardDetails.cvv}
              onChange={handleInput}
              required
              className="p-2 w-full border rounded-md mt-2 focus:outline-none"
            />
          </>
        </fieldset>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="gradient-warm-sunset text-pale-lime transition w-full text-white py-2 px-4 cursor-pointer font-bold rounded-md disabled:opacity-50"
        >
          {pending ? "Signing up..." : "Submit"}
        </button>
      </form>

      <small>Already have account?</small>
      <Link to={"/quickmart/login"} className="text-forest-green text-sm ml-2">
        Login
      </Link>
    </div>
  );
};

export default SignUp;
