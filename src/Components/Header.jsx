import { Link, useLocation, useNavigate } from "react-router-dom";
import '../App.css';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../utils/firebase"; 
import { signOut } from "firebase/auth";
import { ThemeContext } from "../context/ThemeContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'; // Import icons

function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser({ islogin: false, userInfo: {} });
      navigate('/Login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light'); 
  };

  return (
    <header className={`${theme === 'light' ? "bg-white text-black" : "text-gray-400 bg-black"} body-font`}>
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <img width={50} height={40} src="https://cdn.vectorstock.com/i/1000v/92/53/clothing-logo-online-shop-fashion-icon-vector-11979253.jpg" alt="Logo" />
        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <span className={`${theme === 'light' ? "text-black" : "text-white"} ml-3 text-xl`}>Uzain's APP</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {location.pathname !== '/' && (
            <Link to="/" className={`mr-5 hover:text-gray-900 ${theme === 'light' ? "text-black" : "text-white"}`}>
              Home
            </Link>
          )}
          {user.islogin && (
            <Link to="/Search" className={`mr-5 hover:text-gray-900 ${theme === 'light' ? "text-black" : "text-white"}`}>
              More Products
            </Link>
          )}
          <Link to="/About" className={`mr-5 hover:text-gray-900 ${theme === 'light' ? "text-black" : "text-white"}`}>
            About Us
          </Link>
          <Link to="/Contact" className={`mr-5 hover:text-gray-900 ${theme === 'light' ? "text-black" : "text-white"}`}>
            Contact Us
          </Link>
        </nav>

        <button 
          onClick={toggleTheme} 
          className="inline-flex items-center justify-center w-10 h-10 rounded-full mr-5 bg-gray-800 text-white focus:outline-none"
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? (
            <FontAwesomeIcon icon={faSun} size="lg" />
          ) : (
            <FontAwesomeIcon icon={faMoon} size="lg" />
          )}
        </button>

        {user.islogin ? (
          <div className="flex items-center">
            {user.userInfo.photoUrl && (
              <img 
                src={user.userInfo.photoUrl} 
                alt={user.userInfo.name || "User Avatar"} 
                className="w-10 h-10 rounded-full mr-4"
              />
            )}
            <button 
              onClick={handleLogout} 
              className="inline-flex items-center bg-gray-700 border-0 py-1 px-3 focus:outline-none hover:bg-black rounded text-base mt-4 md:mt-0 text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/Login" className="mr-5 hover:text-gray-900">
            <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
