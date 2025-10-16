import { useState } from "react";
import "./Navigation.css";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { DarkThemeToggle } from "flowbite-react";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLoginMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 999 }}
      className={`${showSidebar ? "hidden" : "flex"} fixed h-screen w-[4%] flex-col justify-between bg-black p-4 text-white hover:w-[15%] sm:hidden md:hidden lg:flex xl:flex `}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <div>
          <DarkThemeToggle />
        </div>
        <Link
          to="/"
          className="flex transform items-center transition-transform hover:translate-x-2"
        >
          <AiOutlineHome className="mt-[3rem] mr-2" size={26} />
          <span className="nav-item-name mt-[3rem] hidden">HOME</span>
        </Link>

        <Link
          to="/shop"
          className="flex transform items-center transition-transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mt-[3rem] mr-2" size={26} />
          <span className="nav-item-name mt-[3rem] hidden">SHOP</span>
        </Link>

        <Link
          to="/cart"
          className="flex transform items-center transition-transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
          <span className="nav-item-name mt-[3rem] hidden">CART</span>
        </Link>

        <Link
          to="/favorite"
          className="flex transform items-center transition-transform hover:translate-x-2"
        >
          <FaHeart className="mt-[3rem] mr-2" size={26} />
          <span className="nav-item-name mt-[3rem] hidden">Favorite</span>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="glex text-gray-800 outline-none focus:items-center"
        >
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}
        </button>
      </div>

      <ul>
        <li>
          <Link
            to="/login"
            className="flex transform items-center transition-transform hover:translate-x-2"
          >
            <AiOutlineLogin className="mt-[3rem] mr-2" size={26} />
            <span className="nav-item-name mt-[3rem] hidden">Login</span>
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="flex transform items-center transition-transform hover:translate-x-2"
          >
            <AiOutlineUserAdd className="mt-[3rem] mr-2" size={26} />
            <span className="nav-item-name mt-[3rem] hidden">Register</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Navigation;
