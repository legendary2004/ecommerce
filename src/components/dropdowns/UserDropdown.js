import { useContext } from "react";
import { UserContext } from "../../contexts/AuthContext";
import SignOut from "../buttons/SignOut";

export default function() {
    const user = useContext(UserContext)
    return (
        <>
            <button id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar" className="flex text-sm bg-gray-800 rounded-full md:me-0 ms-2" type="button">
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src={user.photoURL} alt="user photo"/>
            </button>
            <div id="dropdownAvatar" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>{user.displayName}</div>
                <div className="font-medium truncate">{user.email}</div>
                </div>
                <div className="py-2">
                    <SignOut />
                </div>
            </div>
        </>
    )
}