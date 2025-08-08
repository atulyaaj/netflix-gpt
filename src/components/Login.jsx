import { useRef, useState } from "react";
import { Header } from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, getFriendlyFirebaseError } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_IMG, DEFAULT_USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState({});
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validate the form data
    const message = checkValidData(
      name?.current?.value || "",
      email.current.value,
      password.current.value,
      isSignInForm
    );
    setErrorMessage(message);

    // If there are any validation errors, stop here
    if (Object.keys(message).length > 0) return;

    // Sign In/Sign Up Logic
    if (!isSignInForm) {
      // Sign Up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: DEFAULT_USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage({ message: error.message });
            });
        })
        .catch((error) => {
          const friendlyMessage = getFriendlyFirebaseError(error.code);
          setErrorMessage({ message: friendlyMessage });
        });
    } else {
      // Sign In
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const friendlyMessage = getFriendlyFirebaseError(error.code);
          setErrorMessage({ message: friendlyMessage });
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="relative h-screen w-screen text-white">
      <Header />
      <div className="absolute inset-0">
        <img
          className="object-cover h-full w-full"
          src={BACKGROUND_IMG}
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
          <>
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              onFocus={() => {
                setErrorMessage((prev) => ({ ...prev, name: null }));
              }}
              className={`w-full p-4 my-2  bg-zinc-800/50 rounded placeholder-gray-400 border
            ${errorMessage.name ? "border-red-500" : "border-gray-50/25"}`}
            />
            {errorMessage.name && (
              <p className="text-xs text-red-500 mb-2">{errorMessage.name}</p>
            )}
          </>
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email or mobile number"
          onFocus={() => {
            setErrorMessage((prev) => ({ ...prev, email: null }));
          }}
          className={`w-full p-4 my-2  bg-zinc-800/50 rounded placeholder-gray-400 border
            ${errorMessage.email ? "border-red-500" : "border-gray-50/25"}`}
        />
        {errorMessage.email && (
          <p className="text-xs text-red-500 mb-2">{errorMessage.email}</p>
        )}

        <input
          ref={password}
          type="password"
          placeholder="Password"
          onFocus={() => {
            setErrorMessage((prev) => ({ ...prev, password: null }));
          }}
          className={`w-full p-4 my-2  bg-zinc-800/50 rounded placeholder-gray-400 border
            ${errorMessage.password ? "border-red-500" : "border-gray-50/25"}`}
        />
        {errorMessage.password && (
          <p className="text-xs text-red-500 mb-2">{errorMessage.password}</p>
        )}

        {errorMessage.message && (
          <p className="text-sm text-red-500 mt-4">{errorMessage.message}</p>
        )}

        <button
          className="w-full bg-red-600 hover:bg-red-700 py-2 mt-6 rounded"
          onClick={handleButtonClick}
        >
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
