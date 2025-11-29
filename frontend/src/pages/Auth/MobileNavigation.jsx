import { useState, useEffect } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineFileText,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineClose,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation } from "react-router";
import FavoritesCount from "../Products/FavoritesCount";
import CartCount from "./CartCount";

const MobileNavigation = ({ userInfo, logoutHandler }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, icon: Icon, label, showBadge, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
        isActive(to)
          ? "bg-pink-600/20 text-pink-400 dark:bg-amber-600/20 dark:text-amber-400"
          : "text-gray-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      <div className="relative">
        <Icon className="text-xl" />
        {showBadge && (
          <div className="absolute -top-1 -right-1">
            {showBadge === "cart" ? <CartCount /> : <FavoritesCount />}
          </div>
        )}
      </div>
      <span className="font-medium">{label}</span>
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-[999] bg-gradient-to-r from-slate-900 to-black text-white shadow-lg lg:hidden">
      <div className="flex h-16 items-center justify-between px-4">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold transition-transform hover:scale-105"
        >
          <AiOutlineShopping className="text-2xl text-pink-400 dark:text-amber-400" />
          <span className="text-lg">YossiStore</span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <AiOutlineClose className="h-6 w-6" />
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] transform bg-gradient-to-b from-slate-900 to-black shadow-2xl transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 p-4">
            <div className="flex items-center gap-3">
              {userInfo && (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-600/20 text-sm font-semibold dark:bg-amber-600/20">
                  {userInfo.username?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              <div>
                {userInfo ? (
                  <>
                    <p className="font-semibold">{userInfo.username}</p>
                    <p className="text-xs text-gray-400">
                      {userInfo.isAdmin ? "Administrator" : "Customer"}
                    </p>
                  </>
                ) : (
                  <p className="font-semibold">Guest</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-2 transition-colors hover:bg-white/10"
            >
              <AiOutlineClose className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 space-y-1 p-4">
            <NavLink
              to="/"
              icon={AiOutlineHome}
              label="Home"
              onClick={() => setMobileMenuOpen(false)}
            />
            <NavLink
              to="/shop"
              icon={AiOutlineShopping}
              label="Shop"
              onClick={() => setMobileMenuOpen(false)}
            />
            <NavLink
              to="/cart"
              icon={AiOutlineShoppingCart}
              label="Cart"
              showBadge="cart"
              onClick={() => setMobileMenuOpen(false)}
            />

            {userInfo && (
              <>
                <NavLink
                  to="/favorite"
                  icon={FaHeart}
                  label="Favorites"
                  showBadge="favorites"
                  onClick={() => setMobileMenuOpen(false)}
                />
                <NavLink
                  to="/myorders"
                  icon={AiOutlineFileText}
                  label="My Orders"
                  onClick={() => setMobileMenuOpen(false)}
                />
              </>
            )}

            {userInfo && userInfo.isAdmin && (
              <div className="border-t border-white/10 pt-4">
                <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Admin
                </p>
                <NavLink
                  to="/admin/dashboard"
                  icon={AiOutlineFileText}
                  label="Dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                />
                <NavLink
                  to="/admin/productlist"
                  icon={AiOutlineShopping}
                  label="Products"
                  onClick={() => setMobileMenuOpen(false)}
                />
                <NavLink
                  to="/admin/categorylist"
                  icon={AiOutlineFileText}
                  label="Categories"
                  onClick={() => setMobileMenuOpen(false)}
                />
                <NavLink
                  to="/admin/orderlist"
                  icon={AiOutlineFileText}
                  label="Orders"
                  onClick={() => setMobileMenuOpen(false)}
                />
                <NavLink
                  to="/admin/userlist"
                  icon={AiOutlineUser}
                  label="Users"
                  onClick={() => setMobileMenuOpen(false)}
                />
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="border-t border-white/10 p-4">
            {userInfo ? (
              <>
                <NavLink
                  to="/profile"
                  icon={AiOutlineUser}
                  label="Profile"
                  onClick={() => setMobileMenuOpen(false)}
                />
                <button
                  onClick={(e) => {
                    logoutHandler(e);
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-400 transition-colors hover:bg-red-500/20"
                >
                  <AiOutlineLogout className="text-xl" />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  icon={AiOutlineLogin}
                  label="Login"
                  onClick={() => setMobileMenuOpen(false)}
                />
                <NavLink
                  to="/register"
                  icon={AiOutlineUserAdd}
                  label="Register"
                  onClick={() => setMobileMenuOpen(false)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavigation;
