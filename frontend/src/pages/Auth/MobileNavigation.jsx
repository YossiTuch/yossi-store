import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router";
import { DarkThemeToggle } from "flowbite-react";
import FavoritesCount from "../Products/FavoritesCount";

const MobileNavigation = ({ userInfo, logoutHandler }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-[999] bg-black text-white lg:hidden">
      <div className="flex h-14 items-center justify-between px-4">
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2"
        >
          <AiOutlineShopping size={22} />
          <span className="font-semibold">YossiStore</span>
        </Link>
        <div className="flex items-center gap-3">
          <DarkThemeToggle />
          <button
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            onClick={toggleMobileMenu}
            className="inline-flex items-center justify-center rounded p-2 hover:bg-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-gray-800 bg-black px-4 pt-2 pb-4"
        >
          <nav className="flex flex-col space-y-3">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="flex items-center gap-2 hover:text-amber-400"
            >
              <AiOutlineHome size={20} /> <span>Home</span>
            </Link>
            <Link
              to="/shop"
              onClick={closeMobileMenu}
              className="flex items-center gap-2 hover:text-amber-400"
            >
              <AiOutlineShopping size={20} /> <span>Shop</span>
            </Link>
            {userInfo && (
              <>
                <Link
                  to="/cart"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 hover:text-amber-400"
                >
                  <AiOutlineShoppingCart size={20} /> <span>Cart</span>
                </Link>
                <Link
                  to="/favorite"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 hover:text-amber-400"
                >
                  <FaHeart size={18} />
                  <span>Favorites</span>
                  <FavoritesCount />
                </Link>
              </>
            )}
            {userInfo ? (
              <>
                {userInfo.isAdmin && (
                  <>
                    <Link
                      to="/admin/dashboard"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-2 hover:text-amber-400"
                    >
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/admin/productlist"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-2 hover:text-amber-400"
                    >
                      <span>Products</span>
                    </Link>
                    <Link
                      to="/admin/categorylist"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-2 hover:text-amber-400"
                    >
                      <span>Category</span>
                    </Link>
                    <Link
                      to="/admin/orderlist"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-2 hover:text-amber-400"
                    >
                      <span>Orders</span>
                    </Link>
                    <Link
                      to="/admin/userlist"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-2 hover:text-amber-400"
                    >
                      <span>Users</span>
                    </Link>
                  </>
                )}
                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 hover:text-amber-400"
                >
                  <span>Profile</span>
                </Link>
                <button
                  onClick={(e) => {
                    logoutHandler(e);
                    closeMobileMenu();
                  }}
                  className="flex items-center gap-2 text-left hover:text-amber-400"
                >
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 hover:text-amber-400"
                >
                  <AiOutlineLogin size={20} /> <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 hover:text-amber-400"
                >
                  <AiOutlineUserAdd size={20} /> <span>Register</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNavigation;
