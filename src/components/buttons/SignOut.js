import { signOut } from "firebase/auth"
import { auth } from "../../firebase"
import { useNavigate } from "react-router-dom"

export default function() {
    const navigate = useNavigate();
    async function logOut() {
        await signOut(auth)
        navigate("/login")
    }
    return (
        <a href="#" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={logOut}>Sign out</a>
    )
}