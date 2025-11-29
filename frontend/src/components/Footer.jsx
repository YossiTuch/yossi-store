import { Link } from "react-router";
import { DarkThemeToggle } from "flowbite-react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineInfoCircle,
} from "react-icons/ai";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-6 md:justify-start">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-pink-600 dark:text-gray-300 dark:hover:text-amber-400"
            >
              <AiOutlineHome className="text-lg" />
              <span>Home</span>
            </Link>
            <Link
              to="/shop"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-pink-600 dark:text-gray-300 dark:hover:text-amber-400"
            >
              <AiOutlineShopping className="text-lg" />
              <span>Shop</span>
            </Link>
            <Link
              to="/about"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-pink-600 dark:text-gray-300 dark:hover:text-amber-400"
            >
              <AiOutlineInfoCircle className="text-lg" />
              <span>About</span>
            </Link>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} YossiStore. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Theme:
            </span>
            <DarkThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
