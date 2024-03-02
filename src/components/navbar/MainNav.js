import { useContext, useEffect } from "react";
import UserDropdown from "../dropdowns/UserDropdown";
import NavLink from "./NavLink";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { UserContext } from "../../contexts/AuthContext";
import SearchModal from "../modal/SearchModal";
import CartModal from "../modal/CartModal";
import SignIn from "../icons/SignIn";
import NavDropdown from "../dropdowns/NavDropdown";

export default function() {
    const user = useContext(UserContext);

    return (
        <nav className="bg-slate-200 border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap items-center justify-between mx-auto p-4">
            <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">SAMSUNG</span>
            <div className="flex items-center md:order-2 space-x-3 rtl:space-x-reverse">
                <CartModal />
                <SearchModal />
                {user ? <UserDropdown /> : <SignIn />}
                <button data-collapse-toggle="navbar-user" type="button" className="sm:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>
            <div className="items-center justify-between hidden w-full sm:flex sm:w-auto sm:order-1" id="navbar-user">
                <ul className="flex flex-col font-medium p-4 sm:p-0 mt-4 rounded-lg rtl:space-x-reverse sm:flex-row sm:mt-0 sm:border-0 dark:bg-gray-800 sm:dark:bg-gray-900 dark:border-gray-700">
                    <NavLink name="Home" path="/" />
                    <NavDropdown />
                    <NavLink name="About" path="/about" />
                    <NavLink name="Contact" path="/contact" />
                    {user && user.email == 'admin@gmail.com' && <NavLink name="Store" path="/manageStore" />}
                </ul>
            </div>
            </div>
        </nav>
    )
}