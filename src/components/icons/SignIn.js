import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function() {
    const navigate = useNavigate();
    return (
        <FaSignInAlt className="w-8 h-8" onClick={() => navigate("/login")}/>
    )
}