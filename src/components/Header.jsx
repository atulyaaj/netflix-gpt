import { useLocation, useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  const isLogInPage = location.pathname === "/";
  const isBrowsePage = location.pathname === "/browse";

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <>
      {isLogInPage && (
        <div className="absolute w-screen z-10 px-38 py-2">
          <img
            className="w-46"
            src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-24/consent/87b6a5c0-0104-4e96-a291-092c11350111/019808e2-d1e7-7c0f-ad43-c485b7d9a221/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            alt="logo"
          />
        </div>
      )}

      {user && isBrowsePage && (
        <div className="absolute w-screen z-10 px-12 py-2 flex items-center justify-between bg-black text-white">
          <div className="flex items-center space-x-8">
            <img
              className="w-32"
              src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-24/consent/87b6a5c0-0104-4e96-a291-092c11350111/019808e2-d1e7-7c0f-ad43-c485b7d9a221/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
              alt="logo"
            />
            <div className="flex space-x-6 text-sm">
              <span
                className={
                  "hover:text-gray-300 cursor-pointer " + isBrowsePage &&
                  "font-bold"
                }
              >
                Home
              </span>
              <span className="hover:text-gray-300 cursor-pointer">
                TV Shows
              </span>
              <span className="hover:text-gray-300 cursor-pointer">Movies</span>
              <span className="hover:text-gray-300 cursor-pointer">Games</span>
              <span className="hover:text-gray-300 cursor-pointer">
                New & Popular
              </span>
              <span className="hover:text-gray-300 cursor-pointer">
                My List
              </span>
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
              src="https://occ-0-5690-3662.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXz4LMjJFidX8MxhZ6qro8PBTjmHbxlaLAbk45W1DXbKsAIOwyHQPiMAuUnF1G24CLi7InJHK4Ge4jkXul1xIW49Dr5S7fc.png?r=e6e"
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
      )}
    </>
  );
};
