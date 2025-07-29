import React, { useState } from "react";
import { Header } from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="relative h-screen w-screen text-white">
      <Header />
      <div className="absolute inset-0">
        <img
          className="object-cover h-full w-full"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_large.jpg"
          alt="bg"
        />
        <div className="absolute inset-0 bg-black opacity-60" />
      </div>

      <form
        className="absolute top-1/2 left-1/2 w-120 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black/70 p-16 rounded-md"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-3xl font-bold mb-6">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 my-2 border border-gray-50/25 bg-zinc-800/50 rounded placeholder-gray-400"
          />
        )}
        <input
          type="text"
          placeholder="Email or mobile number"
          className="w-full p-4 my-2 border border-gray-50/25 bg-zinc-800/50 rounded placeholder-gray-400"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 my-2 border border-gray-50/25 bg-zinc-800/50 rounded placeholder-gray-400"
        />
        <button className="w-full bg-red-600 hover:bg-red-700 py-2 mt-6 rounded">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        {isSignInForm && (
          <div className="text-center mt-4">
            <span className="underline cursor-pointer hover:text-gray-400">
              Forgot password?
            </span>
          </div>
        )}

        <p className="text-gray-400 mt-6">
          {isSignInForm ? "New to Netflix?" : "Already have an account?"}{" "}
          <span
            className="text-white hover:underline cursor-pointer"
            onClick={toggleSignInForm}
          >
            {isSignInForm ? "Sign up now." : "Sign in now."}
          </span>
        </p>

        <p className="text-xs text-gray-500 mt-4">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Learn more.
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
