import { useLocation, useNavigate } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

export const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  const isLogInPage = location.pathname === "/";
  const isBrowsePage = location.pathname === "/browse";
  // const isBrowsePage = location.pathname.startsWith("/browse");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Cleanup: Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  if (isLogInPage) {
    return (
      <div className="absolute w-screen z-10 px-38 py-2">
        <img className="w-46" src={LOGO} alt="logo" />
      </div>
    );
  }

  if (user && isBrowsePage) {
    return (
      <div className="fixed w-screen z-10 px-12 py-2 flex items-center justify-between bg-black text-white">
        <div className="flex items-center space-x-8">
          <img className="w-32" src={LOGO} alt="logo" />
          <div className="flex space-x-6 text-sm">
            <span
              className={`cursor-pointer ${
                isBrowsePage ? "font-bold" : "hover:text-gray-300"
              }`}
            >
              Home
            </span>
            <span className="hover:text-gray-300 cursor-pointer">TV Shows</span>
            <span className="hover:text-gray-300 cursor-pointer">Movies</span>
            <span className="hover:text-gray-300 cursor-pointer">Games</span>
            <span className="hover:text-gray-300 cursor-pointer">
              New & Popular
            </span>
            <span className="hover:text-gray-300 cursor-pointer">My List</span>
            <span className="hover:text-gray-300 cursor-pointer">
              Browse by Languages
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button className="hover:cursor-pointer">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeWidth={2}
                d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
              />
            </svg>
          </button>
          <span className="text-sm hover:cursor-pointer">Children</span>
          <div className="relative">
            <button>
              <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6v-5a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2z" />
              </svg>
            </button>
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
              2
            </span>
          </div>
          <img
            className="w-8 h-8 rounded"
            alt="user-icon"
            src={user?.photoURL}
          />
          <span>{user?.displayName}</span>
          <span
            onClick={handleSignOut}
            className="text-sm hover:cursor-pointer hover:underline"
          >
            Sign out
          </span>
        </div>
      </div>
    );
  }
};
