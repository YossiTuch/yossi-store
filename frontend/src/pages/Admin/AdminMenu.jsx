import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className={`${
          isMenuOpen ? "top-2 right-2" : "top-5 right-7"
        } fixed rounded-lg bg-[#151515] p-2`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" />
        ) : (
          <>
            <div className="my-1 h-0.5 w-6 bg-gray-200"></div>
            <div className="my-1 h-0.5 w-6 bg-gray-200"></div>
            <div className="my-1 h-0.5 w-6 bg-gray-200"></div>
          </>
        )}
      </button>

      {isMenuOpen && (
        <section className="fixed top-5 right-7 bg-[#151515] p-4">
          <ul className="mt-2 list-none">
            <li>
              <NavLink
                className="mb-5 list-item rounded-sm px-3 py-2 hover:bg-[#2E2D2D]"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className="mb-5 list-item rounded-sm px-3 py-2 hover:bg-[#2E2D2D]"
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                className="mb-5 list-item rounded-sm px-3 py-2 hover:bg-[#2E2D2D]"
                to="/admin/createproduct"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                className="mb-5 list-item rounded-sm px-3 py-2 hover:bg-[#2E2D2D]"
                to="/admin/productlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className="mb-5 list-item rounded-sm px-3 py-2 hover:bg-[#2E2D2D]"
                to="/admin/userlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                className="mb-5 list-item rounded-sm px-3 py-2 hover:bg-[#2E2D2D]"
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
